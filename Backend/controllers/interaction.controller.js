const { GoogleGenAI, createUserContent, Type } = require("@google/genai");
const Drug = require("../models/drugs.model");
const Interaction = require("../models/interaction.model");
const { getCachedDrugs } = require("./drugs.controller"); // Import getter function

// var dbDrugsList = getCachedDrugs();
// console.log("dbDrugsList", dbDrugsList.length);

function levenshteinDistance(str1, str2) {
    const matrix = [];
    const len1 = str1.length;
    const len2 = str2.length;

    // Khởi tạo ma trận
    for (let i = 0; i <= len2; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len1; j++) {
        matrix[0][j] = j;
    }

    // Tính toán khoảng cách
    for (let i = 1; i <= len2; i++) {
        for (let j = 1; j <= len1; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j] + 1 // deletion
                );
            }
        }
    }

    return matrix[len2][len1];
}

// Dựa trên kinh nghiệm thực tế với tên thuốc (< 30 ký tự)
function calculateSimilarity(str1, str2) {
    const dbDrug = str1.toLowerCase().trim();
    const geminiDrug = str2.toLowerCase().trim();

    // Quick checks (nhanh nhất)
    if (dbDrug === geminiDrug) return 1;

    // if (dbDrug.includes(geminiDrug) || geminiDrug.includes(dbDrug)) return 0.95;

    const distance = levenshteinDistance(dbDrug, geminiDrug);
    const maxLength = Math.max(dbDrug.length, geminiDrug.length);

    return 1 - distance / maxLength;
}

// Hàm mapping danh sách A với danh sách B
async function mapDrugsListAWithListB(geminiDrugsList, threshold) {
    try {
        const dbDrugsList = getCachedDrugs();
        var resultArr = [];
        var notMappedDrugs = [];
        for (const geminiDrug of geminiDrugsList) {
            let bestMatch = null;
            let highestScore = 0;

            // Tìm kiếm trong toàn bộ danh sách B để tìm thuốc có score cao nhất
            for (const dbDrug of dbDrugsList) {
                const score = calculateSimilarity(dbDrug, geminiDrug);

                // Cập nhật best match nếu score cao hơn
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = dbDrug;
                }
            }

            // Chỉ thêm vào kết quả nếu score >= 0.8
            if (highestScore >= threshold) {
                resultArr.push(bestMatch);
            } else {
                notMappedDrugs.push(geminiDrug);
            }
        }
        return {mappedDrugs: resultArr, notMappedDrugs: notMappedDrugs};
    } catch (error) {
        console.error("Error in mapDrugsListAWithListB:", error);
        throw error;
    }
}

// Tìm kiếm gợi ý hoạt chất
exports.searchActiveIngredients = async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword || keyword.trim().length < 1) {
            return res.json([]);
        }

        // Tìm kiếm trong collection drug_interaction
        const interactions = await Interaction.find({
            $or: [
                { HoatChat_1: { $regex: keyword.trim(), $options: 'i' } },
                { HoatChat_2: { $regex: keyword.trim(), $options: 'i' } }
            ]
        }).limit(50);

        // Tạo set để loại bỏ duplicate
        const activeIngredientsSet = new Set();
        
        interactions.forEach(interaction => {
            if (interaction.HoatChat_1.toLowerCase().includes(keyword.toLowerCase())) {
                activeIngredientsSet.add(interaction.HoatChat_1.trim());
            }
            if (interaction.HoatChat_2.toLowerCase().includes(keyword.toLowerCase())) {
                activeIngredientsSet.add(interaction.HoatChat_2.trim());
            }
        });

        // Chuyển set thành array và sort
        const suggestions = Array.from(activeIngredientsSet)
            .sort((a, b) => {
                // Ưu tiên những từ bắt đầu bằng keyword
                const aStartsWith = a.toLowerCase().startsWith(keyword.toLowerCase());
                const bStartsWith = b.toLowerCase().startsWith(keyword.toLowerCase());
                
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                
                return a.localeCompare(b);
            })
            .slice(0, 20); // Giới hạn 20 kết quả

        res.json(suggestions.map(ingredient => ({ activeIngredient: ingredient })));
    } catch (error) {
        console.error('Error searching active ingredients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Kiểm tra tương tác bằng hoạt chất
exports.checkInteractionByActiveIngredients = async (req, res) => {
    const { activeIngredients } = req.body;

    try {
        if (!activeIngredients || !Array.isArray(activeIngredients) || activeIngredients.length < 2) {
            return res.status(400).json({
                message: "Cần ít nhất 2 hoạt chất để kiểm tra tương tác"
            });
        }

        // Chuẩn hóa danh sách hoạt chất
        const normalizedIngredients = activeIngredients.map(ingredient => 
            ingredient.trim().toLowerCase()
        );

        // Tìm tất cả các tương tác có liên quan đến các hoạt chất này
        const interactions = await Interaction.find({
            $or: [
                {
                    $and: [
                        { HoatChat_1: { $in: activeIngredients.map(ing => new RegExp(`^${ing.trim()}$`, 'i')) } },
                        { HoatChat_2: { $in: activeIngredients.map(ing => new RegExp(`^${ing.trim()}$`, 'i')) } }
                    ]
                }
            ]
        });

        if (interactions.length === 0) {
            return res.json({
                message: "Không tìm thấy tương tác nào giữa các hoạt chất này",
                interactions: [],
                hasInteractions: false
            });
        }

        // Nhóm kết quả theo mức độ nghiêm trọng
        const groupedInteractions = interactions.reduce((acc, interaction) => {
            const severity = interaction.MucDoNghiemTrong || 'Không xác định';
            if (!acc[severity]) {
                acc[severity] = [];
            }
            acc[severity].push({
                id: interaction.id,
                hoatChat1: interaction.HoatChat_1,
                hoatChat2: interaction.HoatChat_2,
                mucDoNghiemTrong: interaction.MucDoNghiemTrong,
                canhBao: interaction.CanhBaoTuongTacThuoc
            });
            return acc;
        }, {});

        res.json({
            message: `Tìm thấy ${interactions.length} tương tác`,
            interactions: groupedInteractions,
            hasInteractions: true,
            totalInteractions: interactions.length
        });

    } catch (error) {
        console.error('Error checking interactions by active ingredients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Tìm tất cả tương tác có chứa một hoạt chất cụ thể
exports.getInteractionsByActiveIngredient = async (req, res) => {
    try {
        const { ingredientName } = req.query;
        
        if (!ingredientName || ingredientName.trim().length < 1) {
            return res.status(400).json({
                message: "Tên hoạt chất không được để trống",
                interactions: [],
                hasInteractions: false
            });
        }

        const keyword = ingredientName.trim();
        
        // Tìm tất cả các tương tác có chứa hoạt chất này ở cả HoatChat_1 hoặc HoatChat_2
        const interactions = await Interaction.find({
            $or: [
                { HoatChat_1: { $regex: keyword, $options: 'i' } },
                { HoatChat_2: { $regex: keyword, $options: 'i' } }
            ]
        });

        if (interactions.length === 0) {
            return res.json({
                message: `Không tìm thấy tương tác nào cho hoạt chất "${keyword}"`,
                interactions: [],
                hasInteractions: false,
                ingredientName: keyword,
                totalInteractions: 0
            });
        }

        // Nhóm kết quả theo mức độ nghiêm trọng
        const groupedInteractions = interactions.reduce((acc, interaction) => {
            const severity = interaction.MucDoNghiemTrong || 'Không xác định';
            if (!acc[severity]) {
                acc[severity] = [];
            }
            acc[severity].push({
                id: interaction._id,
                hoatChat1: interaction.HoatChat_1,
                hoatChat2: interaction.HoatChat_2,
                mucDoNghiemTrong: interaction.MucDoNghiemTrong || 'Không xác định',
                canhBao: interaction.CanhBaoTuongTacThuoc || 'Không có cảnh báo'
            });
            return acc;
        }, {});

        res.json({
            message: `Tìm thấy ${interactions.length} tương tác cho hoạt chất "${keyword}"`,
            interactions: groupedInteractions,
            hasInteractions: true,
            ingredientName: keyword,
            totalInteractions: interactions.length
        });

    } catch (error) {
        console.error('Error getting interactions by active ingredient:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.checkInteraction = async (req, res) => {
    const { drugNames } = req.body;

    try {
        // Tìm các thuốc trong cơ sở dữ liệu dựa trên tên (không phân biệt hoa thường)
        const drugs = await Drug.find({
            tenThuoc: {
                $in: drugNames.map(
                    (name) => new RegExp(`^${name.trim()}$`, "i")
                ),
            },
        });
        
        console.log("các tên thuốc", drugs);

        if (!drugs.length) {
            return res.status(404).json({
                message: "No drugs found with the provided names",
                missingDrugs: drugNames.filter(
                    (name) =>
                        !drugs.some(
                            (drug) =>
                                drug.tenThuoc.toLowerCase() ===
                                name.toLowerCase()
                        )
                ),
            });
        }

        // Lấy danh sách hoạt chất từ các thuốc
        const activeIngredients = drugs.flatMap((drug) =>
            drug.hoatChat.map((hc) => hc.tenHoatChat.trim().toLowerCase())
        );

        // Lấy tất cả các tương tác từ cơ sở dữ liệu
        const allInteractions = await Interaction.find();

        // Lọc các tương tác dựa trên hoạt chất
        const interactions = allInteractions
            .filter((interaction) => {
                const hoatChat1 = interaction.HoatChat_1.toLowerCase();
                const hoatChat2 = interaction.HoatChat_2.toLowerCase();

                // Kiểm tra nếu cả HoatChat_1 và HoatChat_2 đều nằm trong danh sách hoạt chất
                return (
                    activeIngredients.some((ingredient) => hoatChat1 === ingredient) &&
                    activeIngredients.some((ingredient) => hoatChat2 === ingredient)
                );
            })
            .map((interaction) => {
                // Tìm thuốc chứa HoatChat_1
                const drugWithHoatChat1 = drugs.find((drug) =>
                    drug.hoatChat.some(
                        (hc) =>
                            hc.tenHoatChat.toLowerCase() ===
                            interaction.HoatChat_1.toLowerCase()
                    )
                );

                // Tìm thuốc chứa HoatChat_2
                const drugWithHoatChat2 = drugs.find((drug) =>
                    drug.hoatChat.some(
                        (hc) =>
                            hc.tenHoatChat.toLowerCase() ===
                            interaction.HoatChat_2.toLowerCase()
                    )
                );

                // Trả về interaction với thông tin tên thuốc
                return {
                    ...interaction.toObject(), // Convert Mongoose document to plain object
                    TenThuoc_1: drugWithHoatChat1?.tenThuoc || "Không xác định",
                    TenThuoc_2: drugWithHoatChat2?.tenThuoc || "Không xác định",
                };
            });

        if (!interactions.length) {
            return res.status(404).json({
                message: "No interactions found for the provided drugs",
            });
        }

        // console.log("ds tương tac với tên thuốc", interactions);
        // Trả về danh sách tương tác
        res.status(200).json(interactions);
    } catch (error) {
        console.error("Error checking interactions:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.searchDrugs = async (req, res) => {
    const { keyword } = req.query;

    try {
        const drugs = await Drug.find({
            tenThuoc: { $regex: keyword, $options: "i" }, // Tìm kiếm không phân biệt hoa thường
        })
            .limit(10) // Giới hạn 10 kết quả
            .select("tenThuoc"); // Chỉ lấy trường tên thuốc

        res.status(200).json(drugs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const ai = new GoogleGenAI({ api_key: process.env.GEMINI_API_KEY });

exports.detectDrug = async (req, res) => {
    // console.log("Detect Drug");
    // const ai = new GoogleGenAI({ api_key: process.env.GEMINI_API_KEY });

    const { Base64DocumentUrl } = req.body;
    // Kiểm tra nếu Base64DocumentUrl rỗng hoặc không tồn tại
    if (!Base64DocumentUrl || Base64DocumentUrl.length === 0) {
        return res.status(400).json({
            status: 400,
            message: "Không tìm thấy base64",
            success: false,
            data: null,
        });
    }

    try {
        // Tạo mảng các đối tượng inlineData dựa trên số lượng phần tử trong Base64DocumentUrl
        const inlineDataArray = Base64DocumentUrl.map((base64Data) => ({
            inlineData: {
                mimeType: "image/jpeg",
                data: base64Data,
            },
        }));

        // console.log(inlineDataArray);

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: createUserContent([
                {
                    text: 'Extract the drug names from the prescription image. For each medication item, prioritize the main drug name or the trade name/abbreviation if present in parentheses. For example: from "Vitamin B1 + B6 + B12 (3BTP)", only extract "3BTP". From "Paracetamol (Panactol)", only extract "Panactol". Only return the extracted drug names as an array (or an empty array if none are found), without adding any explanatory text or other content.',
                },
                ...inlineDataArray,
                // {
                //     inlineData: {
                //         mimeType: "image/jpeg",
                //         data: base64ImageData,
                //     },
                // },
            ]),
            responseSchema: {
                type: Type.ARRAY,
                properties: {
                    drugNames: {
                        type: Type.STRING,
                    },
                },
            },
        });

        let detectedDrugs = [];
        const jsonString = result.text
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim();
        detectedDrugs = JSON.parse(jsonString);

        var {mappedDrugs, notMappedDrugs} = await mapDrugsListAWithListB(detectedDrugs, 0.8);

        // console.log(result.text);
        // console.log("Detected Drugs:", detectedDrugs);
        // console.log("Mapped Drugs:", mappedDrugs);
        // console.log("Not Mapped Drugs:", notMappedDrugs);

        if (detectedDrugs.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "Không tìm thấy thuốc trong ảnh",
                data: null,
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Trích xuất thành công",
                data: mappedDrugs,
                notMappedDrugs: notMappedDrugs,
            });
        }
    } catch (error) {
        console.error("Error detecting drug:", error.message);
        // res.status(500).json({ error: "Lỗi trích xuất tên thuốc" });
        res.status(500).json({
            status: 500,
            message: "Lỗi khi phát hiện thuốc",
            data: null,
            error: error.message,
        });
    }
};
