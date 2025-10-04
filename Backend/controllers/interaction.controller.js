const { GoogleGenAI, createUserContent, Type } = require("@google/genai");
const Drug = require("../models/drugs.model");
const Interaction = require("../models/interaction.model");

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
        const interactions = allInteractions.filter((interaction) => {
            const hoatChat1 = interaction.HoatChat_1.toLowerCase();
            const hoatChat2 = interaction.HoatChat_2.toLowerCase();

            // Kiểm tra nếu cả HoatChat_1 và HoatChat_2 đều nằm trong danh sách hoạt chất
            return (
                activeIngredients.some(
                    (ingredient) => hoatChat1 === ingredient
                ) &&
                activeIngredients.some((ingredient) => hoatChat2 === ingredient)
            );
        });

        if (!interactions.length) {
            return res.status(404).json({
                message: "No interactions found for the provided drugs",
            });
        }

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
    console.log("Detect Drug");
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

        // const response = await fetch(Base64DocumentUrl[0]);
        // const imageArrayBuffer = await response.arrayBuffer();
        // const base64ImageData =
        //     Buffer.from(imageArrayBuffer).toString("base64");
        // console.log("base64ImageData", base64ImageData);

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: createUserContent([
                {
                    text: "Extract the drug names from the prescription image. For each medication item, prioritize the main drug name or the trade name/abbreviation if present in parentheses. For example: from 'Vitamin B1 + B6 + B12 (3BTP)', only extract '3BTP'. From 'Paracetamol (Panactol)', only extract 'Panactol'. Only return the extracted drug names as an array (or an empty array if none are found), without adding any explanatory text or other content.",
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

        console.log(result.text);
        console.log(detectedDrugs);

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
                data: detectedDrugs,
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
