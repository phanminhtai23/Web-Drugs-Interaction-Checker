import React, { useState } from "react";
import axios from "../services/api";
import {
    TextField,
    Button,
    List,
    ListItem,
    CircularProgress,
    Alert,
    Box,
    Typography,
    IconButton,
    Autocomplete,
    Avatar,
    Snackbar,
    Card,
    CardContent,
    Chip,
    Menu,
    MenuItem,
} from "@mui/material";
import { Delete, Add, SwapVert } from "@mui/icons-material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ScienceIcon from "@mui/icons-material/Science";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CodeIcon from "@mui/icons-material/Code";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";


const ActiveIngredientSearch = () => {
    const [activeIngredientName, setActiveIngredientName] = useState("");
    const [activeIngredientList, setActiveIngredientList] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [noInteractions, setNoInteractions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [downloadMenuAnchor, setDownloadMenuAnchor] = useState(null);

    // Lấy gợi ý hoạt chất từ API
    const fetchSuggestions = async (keyword) => {
        if (!keyword) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(
                `/interactions/search-active-ingredients?keyword=${keyword}`
            );
            setSuggestions(response.data.map((item) => item.activeIngredient));
        } catch (error) {
            console.error("Lỗi khi lấy gợi ý hoạt chất:", error);
        }
    };

    // Thêm hoạt chất vào danh sách
    const handleAddActiveIngredient = () => {
        if (
            activeIngredientName.trim() &&
            suggestions.includes(activeIngredientName.trim()) &&
            !activeIngredientList.includes(activeIngredientName.trim())
        ) {
            setActiveIngredientList([...activeIngredientList, activeIngredientName.trim()]);
        }
        setActiveIngredientName("");
    };

    // Xóa hoạt chất khỏi danh sách
    const handleRemoveActiveIngredient = (ingredient) => {
        setActiveIngredientList(activeIngredientList.filter((item) => item !== ingredient));
    };

    // Kiểm tra tương tác
    const handleCheckInteraction = async () => {
        setLoading(true);
        setError("");
        setNoInteractions(false);
        setInteractions([]);

        try {
            const response = await axios.post("/interactions/check-by-active-ingredients", {
                activeIngredients: activeIngredientList,
            });

            if (response.data.hasInteractions) {
                setInteractions(response.data.interactions);
                setSuccessMessage(
                    `Tìm thấy ${response.data.totalInteractions} tương tác giữa các hoạt chất`
                );
                setShowSuccessMessage(true);
            } else {
                setNoInteractions(true);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setError(error.response.data.message);
            } else {
                setError("Có lỗi xảy ra khi kiểm tra tương tác hoạt chất");
            }
        } finally {
            setLoading(false);
        }
    };

    // Reset form
    const handleReset = () => {
        setActiveIngredientList([]);
        setInteractions([]);
        setError("");
        setNoInteractions(false);
        setActiveIngredientName("");
        setSuggestions([]);
    };

    // Xử lý đóng snackbar
    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
    };

    // Hàm tạo và tải xuống PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        
        // Thiết lập font
        doc.setFont('helvetica');
        
        // Header với màu xanh
        doc.setFillColor(70, 130, 180);
        doc.rect(15, 15, 180, 25, 'F');
        
        // Tiêu đề chính
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text('BAO CAO TUONG TAC HOAT CHAT', 105, 32, { align: 'center' });
        
        // Khung thông tin chung
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(245, 245, 245);
        doc.rect(15, 50, 180, 30, 'FD');
        
        // Thông tin chung
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const currentDate = new Date().toLocaleDateString('vi-VN');
        doc.text(`Ngay tao: ${currentDate}`, 20, 62);
        doc.text(`Danh sach hoat chat: ${activeIngredientList.join(', ')}`, 20, 72);
        
        const totalInteractions = Object.values(interactions).reduce((sum, arr) => sum + arr.length, 0);
        doc.text(`So luong tuong tac: ${totalInteractions}`, 20, 82);
        
        // Tiêu đề chi tiết
        doc.setFontSize(16);
        doc.setTextColor(70, 130, 180);
        doc.text('CHI TIET TUONG TAC:', 20, 95);
        
        let yPos = 105;
        
        if (Object.keys(interactions).length > 0) {
            Object.entries(interactions).forEach(([severity, interactionList], severityIndex) => {
                // Màu sắc theo mức độ
                let severityColor = [0, 0, 0];
                let severityText = severity;
                switch(severity) {
                    case 'Nghiêm trọng':
                        severityColor = [211, 47, 47];
                        severityText = 'Nghiem trong';
                        break;
                    case 'Trung bình':
                        severityColor = [245, 124, 0];
                        severityText = 'Trung binh';
                        break;
                    case 'Nhẹ':
                        severityColor = [25, 118, 210];
                        severityText = 'Nhe';
                        break;
                    default:
                        severityColor = [0, 0, 0];
                        severityText = severity;
                        break;
                }
                
                interactionList.forEach((interaction, index) => {
                    // Kiểm tra xem có đủ không gian không
                    if (yPos > 250) {
                        doc.addPage();
                        yPos = 30;
                    }
                    
                    // Khung cho mỗi tương tác
                    doc.setDrawColor(...severityColor);
                    doc.setLineWidth(2);
                    doc.rect(15, yPos - 5, 180, 50, 'D');
                    
                    // Số thứ tự và mức độ
                    doc.setFontSize(14);
                    doc.setTextColor(...severityColor);
                    const interactionNumber = Object.values(interactions)
                        .slice(0, severityIndex)
                        .reduce((sum, arr) => sum + arr.length, 0) + index + 1;
                    doc.text(`${interactionNumber}. Muc do: ${severityText}`, 20, yPos + 5);
                    
                    // Hoạt chất tương tác
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0);
                    doc.text(`Hoat chat: ${interaction.hoatChat1} <-> ${interaction.hoatChat2}`, 20, yPos + 15);
                    
                    // Cảnh báo không dấu
                    const warning = interaction.canhBao || 'Khong co thong tin chi tiet';
                    // Loại bỏ dấu từ cảnh báo
                    const warningNoDiacritics = warning
                        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                        .replace(/[ìíịỉĩ]/g, 'i')
                        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                        .replace(/[ùúụủũưừứựửữ]/g, 'u')
                        .replace(/[ỳýỵỷỹ]/g, 'y')
                        .replace(/[đ]/g, 'd')
                        .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
                        .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
                        .replace(/[ÌÍỊỈĨ]/g, 'I')
                        .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
                        .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
                        .replace(/[ỲÝỴỶỸ]/g, 'Y')
                        .replace(/[Đ]/g, 'D');
                    
                    const warningLines = doc.splitTextToSize(`Canh bao: ${warningNoDiacritics}`, 170);
                    doc.text(warningLines, 20, yPos + 28);
                    
                    yPos += 60;
                });
            });
        } else {
            // Thông báo không có tương tác
            doc.setFillColor(225, 245, 254);
            doc.rect(15, yPos - 5, 180, 30, 'F');
            doc.setFontSize(12);
            doc.setTextColor(25, 118, 210);
            doc.text('Khong tim thay tuong tac nao giua cac hoat chat da chon.', 20, yPos + 5);
            doc.text('Ket qua nay chi dua tren du lieu hien co.', 20, yPos + 15);
            doc.text('Luon tham khao y kien bac si chuyen khoa truoc khi su dung thuoc.', 20, yPos + 25);
        }
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Trang ${i}/${pageCount} - Bao cao duoc tao tu He thong Kiem tra Tuong tac Thuoc`, 105, 285, { align: 'center' });
        }
        
        // Lưu file
        const fileName = `tuong_tac_hoat_chat_${new Date().getTime()}.pdf`;
        doc.save(fileName);
        
        setDownloadMenuAnchor(null);
        setSuccessMessage('Đã tải xuống báo cáo PDF thành công!');
        setShowSuccessMessage(true);
    };

    // Hàm tạo và tải xuống XML
    const downloadXML = () => {
        const currentDate = new Date().toISOString();
        const totalInteractions = Object.values(interactions).reduce((sum, arr) => sum + arr.length, 0);
        
        let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xmlContent += `<BaoCaoTuongTacHoatChat>\n`;
        xmlContent += `  <ThongTinChung>\n`;
        xmlContent += `    <NgayTao>${currentDate}</NgayTao>\n`;
        xmlContent += `    <DanhSachHoatChat>\n`;
        
        activeIngredientList.forEach((ingredient, index) => {
            xmlContent += `      <HoatChat id="${index + 1}">${ingredient}</HoatChat>\n`;
        });
        
        xmlContent += `    </DanhSachHoatChat>\n`;
        xmlContent += `    <TongSoTuongTac>${totalInteractions}</TongSoTuongTac>\n`;
        xmlContent += `  </ThongTinChung>\n`;
        xmlContent += `  <ChiTietTuongTac>\n`;
        
        if (Object.keys(interactions).length > 0) {
            let interactionId = 1;
            Object.entries(interactions).forEach(([severity, interactionList]) => {
                interactionList.forEach((interaction) => {
                    xmlContent += `    <TuongTac id="${interactionId}">\n`;
                    xmlContent += `      <MucDo>${severity}</MucDo>\n`;
                    xmlContent += `      <HoatChat1>${interaction.hoatChat1}</HoatChat1>\n`;
                    xmlContent += `      <HoatChat2>${interaction.hoatChat2}</HoatChat2>\n`;
                    xmlContent += `      <CanhBao>${interaction.canhBao || 'Khong co thong tin chi tiet'}</CanhBao>\n`;
                    xmlContent += `    </TuongTac>\n`;
                    interactionId++;
                });
            });
        } else {
            xmlContent += `    <ThongBao>Khong tim thay tuong tac nao giua cac hoat chat da chon</ThongBao>\n`;
        }
        
        xmlContent += `  </ChiTietTuongTac>\n`;
        xmlContent += `</BaoCaoTuongTacHoatChat>`;
        
        // Tạo và tải xuống file
        const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
        const fileName = `tuong_tac_hoat_chat_${new Date().getTime()}.xml`;
        saveAs(blob, fileName);
        
        setDownloadMenuAnchor(null);
        setSuccessMessage('Đã tải xuống báo cáo XML thành công!');
        setShowSuccessMessage(true);
    };

    // Hàm xử lý mở menu tải xuống
    const handleDownloadMenuOpen = (event) => {
        setDownloadMenuAnchor(event.currentTarget);
    };

    // Hàm xử lý đóng menu tải xuống
    const handleDownloadMenuClose = () => {
        setDownloadMenuAnchor(null);
    };

    // Render kết quả tương tác
    const renderInteractionResults = () => {
        const severityConfig = {
            "Nghiêm trọng": { 
                color: "#d32f2f", 
                icon: ErrorIcon, 
                bgColor: "#ffebee",
                gradient: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
                chipGradient: "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)"
            },
            "Trung bình": { 
                color: "#f57c00", 
                icon: WarningAmberIcon, 
                bgColor: "#fff3e0",
                gradient: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                chipGradient: "linear-gradient(45deg, #f57c00 30%, #ff9800 90%)"
            },
            "Nhẹ": { 
                color: "#1976d2", 
                icon: InfoIcon, 
                bgColor: "#e3f2fd",
                gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                chipGradient: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)"
            },
        };

        return Object.entries(interactions).map(([severity, interactionList]) => {
            const config = severityConfig[severity] || {
                color: "#666",
                icon: InfoIcon,
                bgColor: "#f5f5f5",
                gradient: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
                chipGradient: "linear-gradient(45deg, #666 30%, #888 90%)"
            };
            const IconComponent = config.icon;

            return (
                <Card 
                    key={severity} 
                    sx={{ 
                        mb: { xs: 2, sm: 3 },
                        border: { xs: `1px solid ${config.color}`, sm: `2px solid ${config.color}` },
                        borderRadius: { xs: 2, sm: 3 },
                        background: config.gradient,
                        boxShadow: { xs: `0 2px 12px rgba(0,0,0,0.08)`, sm: `0 4px 20px rgba(0,0,0,0.1)` },
                        overflow: 'hidden',
                        '&:hover': {
                            boxShadow: { xs: `0 4px 16px rgba(0,0,0,0.12)`, sm: `0 6px 25px rgba(0,0,0,0.15)` },
                            transform: { xs: 'none', sm: 'translateY(-2px)' }
                        },
                        transition: 'all 0.3s ease-in-out'
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: { xs: "flex-start", sm: "center" },
                            flexDirection: { xs: "column", sm: "row" },
                            mb: { xs: 2, sm: 3 },
                            gap: { xs: 1.5, sm: 0 }
                        }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: { xs: 40, sm: 48 },
                                    height: { xs: 40, sm: 48 },
                                    borderRadius: '50%',
                                    background: `linear-gradient(45deg, ${config.color} 30%, ${config.color}80 90%)`,
                                    boxShadow: `0 4px 15px ${config.color}40`,
                                    mr: { xs: 0, sm: 2 },
                                    mb: { xs: 1, sm: 0 },
                                    alignSelf: { xs: "center", sm: "flex-start" }
                                }}
                            >
                                <IconComponent sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }} />
                            </Box>
                            <Box sx={{ textAlign: { xs: "center", sm: "left" }, flex: 1 }}>
                                <Typography
                                    variant="h5"
                                    sx={{ 
                                        color: config.color, 
                                        fontWeight: "bold",
                                        mb: 0.5,
                                        fontSize: { xs: "1.1rem", sm: "1.5rem" }
                                    }}
                                >
                                    {severity}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ 
                                        color: `${config.color}CC`,
                                        fontWeight: 500,
                                        fontSize: { xs: "0.8rem", sm: "0.875rem" }
                                    }}
                                >
                                    {interactionList.length} tương tác được tìm thấy
                                </Typography>
                            </Box>
                        </Box>
                        
                        {interactionList.map((interaction, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    mb: { xs: 1.5, sm: 2 },
                                    backgroundColor: "white",
                                    borderRadius: { xs: 1.5, sm: 2 },
                                    border: `1px solid ${config.color}30`,
                                    boxShadow: { xs: '0 1px 6px rgba(0,0,0,0.06)', sm: '0 2px 10px rgba(0,0,0,0.08)' },
                                    '&:hover': {
                                        boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.1)', sm: '0 4px 15px rgba(0,0,0,0.12)' },
                                        transform: { xs: 'none', sm: 'translateY(-1px)' }
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                    '&:last-child': {
                                        mb: 0
                                    }
                                }}
                            >
                                <Box sx={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    mb: { xs: 1.5, sm: 2 }, 
                                    justifyContent: 'center',
                                    flexWrap: { xs: "wrap", sm: "nowrap" },
                                    gap: { xs: 1, sm: 0 }
                                }}>
                                    <Chip
                                        label={interaction.hoatChat1}
                                        sx={{ 
                                            mr: { xs: 0, sm: 2 },
                                            mb: { xs: 1, sm: 0 },
                                            background: config.chipGradient,
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                            height: { xs: 32, sm: 36 },
                                            maxWidth: { xs: '45%', sm: 'none' },
                                            boxShadow: `0 2px 8px ${config.color}40`,
                                            '& .MuiChip-label': {
                                                px: { xs: 1.5, sm: 2 },
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: { xs: 'none', sm: 'flex' },
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: { xs: 32, sm: 40 },
                                            height: { xs: 32, sm: 40 },
                                            borderRadius: '50%',
                                            background: `linear-gradient(45deg, ${config.color}20 30%, ${config.color}40 90%)`,
                                            mx: 1
                                        }}
                                    >
                                        <SwapVert sx={{ color: config.color, fontSize: { xs: 16, sm: 20 } }} />
                                    </Box>
                                    {/* Icon for mobile - smaller and different position */}
                                    <Box
                                        sx={{
                                            display: { xs: 'flex', sm: 'none' },
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            mb: 1,
                                            order: { xs: -1, sm: 0 }
                                        }}
                                    >
                                        <Typography sx={{ color: config.color, fontSize: '0.8rem', fontWeight: 600 }}>
                                            ⇅ Tương tác
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={interaction.hoatChat2}
                                        sx={{ 
                                            ml: { xs: 0, sm: 2 },
                                            background: config.chipGradient,
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                            height: { xs: 32, sm: 36 },
                                            maxWidth: { xs: '45%', sm: 'none' },
                                            boxShadow: `0 2px 8px ${config.color}40`,
                                            '& .MuiChip-label': {
                                                px: { xs: 1.5, sm: 2 },
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }}
                                    />
                                </Box>
                                
                                <Box
                                    sx={{
                                        p: { xs: 1.5, sm: 2 },
                                        backgroundColor: `${config.color}08`,
                                        borderRadius: { xs: 1, sm: 1.5 },
                                        borderLeft: { xs: `3px solid ${config.color}`, sm: `4px solid ${config.color}` },
                                        mt: { xs: 1, sm: 0 }
                                    }}
                                >
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: "#333",
                                            lineHeight: { xs: 1.4, sm: 1.6 },
                                            fontWeight: 500,
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}
                                    >
                                        <Box component="span" sx={{ 
                                            fontWeight: 700, 
                                            color: config.color,
                                            display: { xs: 'block', sm: 'inline' },
                                            mb: { xs: 0.5, sm: 0 }
                                        }}>
                                            ⚠️ Cảnh báo:
                                        </Box>{" "}
                                        {interaction.canhBao || "Không có thông tin chi tiết"}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            );
        });
    };

    return (
        <Box
            sx={{
                maxWidth: { xs: "100%", sm: "900px", md: "1000px" },
                mx: "auto",
                mt: { xs: 2, sm: 5 },
                p: { xs: 1.5, sm: 3 },
                backgroundColor: "#fff",
                borderRadius: { xs: 2, sm: 4 },
                border: { xs: "none", sm: "1px solid #e0e0e0" },
                minHeight: { xs: "calc(100vh - 80px)", sm: "auto" },
                boxShadow: { xs: "none", sm: "0 2px 8px rgba(0,0,0,0.1)" },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    mb: { xs: 2, sm: 3 },
                    gap: { xs: 1.5, sm: 0 },
                    position: "sticky",
                    top: { xs: 0, sm: "auto" },
                    backgroundColor: { xs: "#fff", sm: "transparent" },
                    zIndex: { xs: 10, sm: "auto" },
                    py: { xs: 1, sm: 0 },
                    mx: { xs: -1.5, sm: 0 },
                    px: { xs: 1.5, sm: 0 },
                    borderBottom: { xs: "1px solid #e0e0e0", sm: "none" },
                }}
            >
                <Autocomplete
                    options={suggestions}
                    inputValue={activeIngredientName}
                    onInputChange={(event, value, reason) => {
                        if (reason === "input") {
                            setActiveIngredientName(value);
                            fetchSuggestions(value);
                        } else if (reason === "clear") {
                            setActiveIngredientName("");
                        }
                    }}
                    onChange={(event, value) => {
                        if (value && !activeIngredientList.includes(value)) {
                            setActiveIngredientList([...activeIngredientList, value]);
                            setSuccessMessage(
                                `Đã thêm hoạt chất "${value}" vào danh sách`
                            );
                            setShowSuccessMessage(true);
                        }
                        setActiveIngredientName("");
                    }}
                    filterOptions={(x) => x}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nhập tên hoạt chất"
                            variant="outlined"
                            fullWidth
                            placeholder="Ví dụ: Acetaminophen, Ibuprofen..."
                            size={ window.innerWidth < 600 ? "small" : "medium" }
                            sx={{
                                "& .MuiOutlinedInput-root": { 
                                    borderRadius: { xs: 2, sm: 3 },
                                    fontSize: { xs: "0.9rem", sm: "1rem" }
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: { xs: "0.9rem", sm: "1rem" }
                                },
                            }}
                        />
                    )}
                    sx={{
                        flex: 1,
                        mr: 2,
                        "& .MuiAutocomplete-inputRoot": {
                            paddingRight: "40px !important",
                        },
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddActiveIngredient}
                        startIcon={<Add />}
                        disabled={
                            !activeIngredientName.trim() ||
                            !suggestions.includes(activeIngredientName.trim()) ||
                            activeIngredientList.includes(activeIngredientName.trim())
                        }
                        sx={{
                            py: { xs: 1.2, sm: 1.8 },
                            px: { xs: 2.5, sm: 3 },
                            height: { xs: "48px", sm: "56px" },
                            minWidth: { xs: "100%", sm: "146px" },
                            background:
                                "linear-gradient(90deg, #1976d2, #155a9c)",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: { xs: "0.85rem", sm: "1rem" },
                            textTransform: "none",
                            borderRadius: { xs: 2, sm: 3 },
                            boxShadow: { xs: "0 2px 8px rgba(25, 118, 210, 0.3)", sm: "0 4px 12px rgba(25, 118, 210, 0.3)" },
                            "&:hover": {
                                background:
                                    "linear-gradient(90deg, #155a9c, #1976d2)",
                                boxShadow: { xs: "0 4px 12px rgba(25, 118, 210, 0.4)", sm: "0 6px 16px rgba(25, 118, 210, 0.4)" },
                            },
                        }}
                    >
                        Thêm vào
                    </Button>
                </Box>
            </Box>

            {/* Danh sách hoạt chất */}
            {activeIngredientList.length > 0 && (
                <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", sm: "center" },
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: 1, sm: 0 },
                            mb: { xs: 1.5, sm: 2 },
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#333",
                                fontSize: { xs: "1rem", sm: "1.25rem" },
                                mb: { xs: 1, sm: 0 },
                            }}
                        >
                            Danh sách hoạt chất ({activeIngredientList.length})
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<RestartAltIcon />}
                            onClick={handleReset}
                            size={ window.innerWidth < 600 ? "small" : "medium" }
                            sx={{
                                textTransform: "none",
                                borderRadius: { xs: 1.5, sm: 2 },
                                color: "#666",
                                borderColor: "#ccc",
                                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                px: { xs: 2, sm: 2.5 },
                                py: { xs: 0.5, sm: 1 },
                                alignSelf: { xs: "flex-end", sm: "auto" },
                                "&:hover": {
                                    borderColor: "#999",
                                    backgroundColor: "#f5f5f5",
                                },
                            }}
                        >
                            Bắt đầu lại
                        </Button>
                    </Box>

                    <List sx={{ p: 0 }}>
                        {activeIngredientList.map((ingredient, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    backgroundColor: "#f8f9fa",
                                    border: "1px solid #e9ecef",
                                    borderRadius: { xs: 1.5, sm: 2 },
                                    mb: { xs: 0.75, sm: 1 },
                                    px: { xs: 2, sm: 3 },
                                    py: { xs: 1.5, sm: 2 },
                                    minHeight: { xs: 56, sm: 64 },
                                    "&:hover": {
                                        backgroundColor: "#e9ecef",
                                        transform: { xs: "none", sm: "translateY(-1px)" },
                                        boxShadow: { xs: "none", sm: "0 2px 8px rgba(0,0,0,0.1)" },
                                    },
                                    transition: "all 0.2s ease-in-out",
                                }}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleRemoveActiveIngredient(ingredient)}
                                        size={ window.innerWidth < 600 ? "small" : "medium" }
                                        sx={{
                                            color: "#dc3545",
                                            width: { xs: 36, sm: 40 },
                                            height: { xs: 36, sm: 40 },
                                            "&:hover": {
                                                backgroundColor: "#f8d7da",
                                                transform: "scale(1.1)",
                                            },
                                        }}
                                    >
                                        <Delete fontSize={ window.innerWidth < 600 ? "small" : "medium" } />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    sx={{
                                        backgroundColor: "#1976d2",
                                        width: { xs: 32, sm: 36 },
                                        height: { xs: 32, sm: 36 },
                                        mr: { xs: 1.5, sm: 2 },
                                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                                    }}
                                >
                                    <ScienceIcon fontSize={ window.innerWidth < 600 ? "small" : "medium" } />
                                </Avatar>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "500",
                                        color: "#333",
                                        fontSize: { xs: "0.85rem", sm: "1rem" },
                                        lineHeight: { xs: 1.3, sm: 1.5 },
                                        wordBreak: "break-word",
                                        flex: 1,
                                        pr: { xs: 1, sm: 2 },
                                    }}
                                >
                                    {ingredient}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ 
                        display: "flex", 
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 1.5, sm: 2 }, 
                        mt: { xs: 2, sm: 3 },
                        position: { xs: "sticky", sm: "static" },
                        bottom: { xs: 0, sm: "auto" },
                        backgroundColor: { xs: "#fff", sm: "transparent" },
                        p: { xs: 1.5, sm: 0 },
                        mx: { xs: -1.5, sm: 0 },
                        borderTop: { xs: "1px solid #e0e0e0", sm: "none" },
                        zIndex: { xs: 10, sm: "auto" },
                    }}>
                        <Button
                            variant="contained"
                            onClick={handleCheckInteraction}
                            disabled={loading || activeIngredientList.length < 2}
                            startIcon={
                                loading ? (
                                    <CircularProgress size={ window.innerWidth < 600 ? 16 : 20 } color="inherit" />
                                ) : (
                                    <ScienceIcon fontSize={ window.innerWidth < 600 ? "small" : "medium" } />
                                )
                            }
                            sx={{
                                flex: 1,
                                py: { xs: 1.2, sm: 1.5 },
                                px: { xs: 2, sm: 3 },
                                background:
                                    "linear-gradient(90deg, #1976d2, #155a9c)",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: { xs: "0.85rem", sm: "1rem" },
                                textTransform: "none",
                                borderRadius: { xs: 2, sm: 3 },
                                minHeight: { xs: 48, sm: 56 },
                                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(90deg, #155a9c, #1976d2)",
                                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                                    transform: { xs: "none", sm: "translateY(-1px)" },
                                },
                                "&:disabled": {
                                    background: "#ccc",
                                    color: "#666",
                                    boxShadow: "none",
                                },
                                transition: "all 0.2s ease-in-out",
                            }}
                        >
                            {loading ? "Đang kiểm tra..." : "Kiểm tra tương tác"}
                        </Button>

                        {/* Nút tải xuống - chỉ hiển thị khi có kết quả */}
                        {(Object.keys(interactions).length > 0 || noInteractions) && (
                            <>
                                <Button
                                    variant="outlined"
                                    onClick={handleDownloadMenuOpen}
                                    startIcon={<DownloadIcon fontSize={ window.innerWidth < 600 ? "small" : "medium" } />}
                                    endIcon={<ExpandMoreIcon fontSize={ window.innerWidth < 600 ? "small" : "medium" } />}
                                    sx={{
                                        py: { xs: 1.2, sm: 1.5 },
                                        px: { xs: 2, sm: 3 },
                                        textTransform: "none",
                                        borderRadius: { xs: 2, sm: 3 },
                                        color: "#1976d2",
                                        borderColor: "#1976d2",
                                        fontSize: { xs: "0.85rem", sm: "1rem" },
                                        minHeight: { xs: 48, sm: 56 },
                                        minWidth: { xs: "120px", sm: "auto" },
                                        "&:hover": {
                                            borderColor: "#155a9c",
                                            backgroundColor: "#f3f8ff",
                                            transform: { xs: "none", sm: "translateY(-1px)" },
                                        },
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                >
                                    Tải xuống
                                </Button>

                                <Menu
                                    anchorEl={downloadMenuAnchor}
                                    open={Boolean(downloadMenuAnchor)}
                                    onClose={handleDownloadMenuClose}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: { xs: 1.5, sm: 2 },
                                            boxShadow: { xs: "0 2px 12px rgba(0,0,0,0.15)", sm: "0 4px 20px rgba(0,0,0,0.1)" },
                                            minWidth: { xs: 160, sm: 180 },
                                            maxWidth: { xs: "90vw", sm: "none" },
                                        },
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem
                                        onClick={downloadPDF}
                                        sx={{
                                            py: { xs: 1.2, sm: 1.5 },
                                            px: { xs: 1.5, sm: 2 },
                                            minHeight: { xs: 48, sm: 56 },
                                            "&:hover": {
                                                backgroundColor: "#f3f8ff",
                                            },
                                        }}
                                    >
                                        <PictureAsPdfIcon
                                            sx={{ 
                                                mr: { xs: 1.5, sm: 2 }, 
                                                color: "#d32f2f",
                                                fontSize: { xs: 20, sm: 24 }
                                            }}
                                        />
                                        <Box>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 500,
                                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                                }}
                                            >
                                                Tải PDF
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ 
                                                    color: "#666", 
                                                    display: { xs: 'none', sm: 'block' },
                                                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                                }}
                                            >
                                                Báo cáo định dạng PDF
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={downloadXML}
                                        sx={{
                                            py: { xs: 1.2, sm: 1.5 },
                                            px: { xs: 1.5, sm: 2 },
                                            minHeight: { xs: 48, sm: 56 },
                                            "&:hover": {
                                                backgroundColor: "#f3f8ff",
                                            },
                                        }}
                                    >
                                        <CodeIcon sx={{ 
                                            mr: { xs: 1.5, sm: 2 }, 
                                            color: "#1976d2",
                                            fontSize: { xs: 20, sm: 24 }
                                        }} />
                                        <Box>
                                            <Typography 
                                                variant="body1" 
                                                sx={{ 
                                                    fontWeight: 500,
                                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                                }}
                                            >
                                                Tải XML
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ 
                                                    color: "#666", 
                                                    display: { xs: 'none', sm: 'block' },
                                                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                                }}
                                            >
                                                Dữ liệu có cấu trúc
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}

                        {/* <Button
                            variant="outlined"
                            onClick={handleReset}
                            startIcon={<RestartAltIcon />}
                            sx={{
                                py: 1.5,
                                px: 3,
                                textTransform: "none",
                                borderRadius: 3,
                                color: "#666",
                                borderColor: "#ccc",
                                "&:hover": {
                                    borderColor: "#999",
                                    backgroundColor: "#f5f5f5",
                                },
                            }}  
                        >
                            Lưu lịch sử
                        </Button> */}
                    </Box>

                    {activeIngredientList.length < 2 && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: { xs: 1.5, sm: 2 },
                                textAlign: "center",
                                fontStyle: "italic",
                                color: "#666",
                                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                px: { xs: 1, sm: 0 },
                                py: { xs: 1, sm: 0 },
                                backgroundColor: { xs: "#f8f9fa", sm: "transparent" },
                                borderRadius: { xs: 1, sm: 0 },
                            }}
                        >
                            💡 Cần ít nhất 2 hoạt chất để kiểm tra tương tác
                        </Typography>
                    )}
                </Box>
            )}

            {/* Hiển thị lỗi */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Hiển thị khi không có tương tác */}
            {noInteractions && (
                <Alert
                    severity="info"
                    sx={{ 
                        mb: { xs: 1.5, sm: 2 },
                        borderRadius: { xs: 1.5, sm: 2 },
                        '& .MuiAlert-message': {
                            width: '100%'
                        }
                    }}
                    icon={<InfoIcon />}
                >
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            mb: { xs: 0.5, sm: 1 }
                        }}
                    >
                        📊 Không tìm thấy tương tác nào giữa các hoạt chất đã chọn.
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mt: { xs: 0.5, sm: 1 }, 
                            color: "#666",
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            lineHeight: { xs: 1.4, sm: 1.5 }
                        }}
                    >
                        Kết quả này chỉ dựa trên dữ liệu hiện có. Luôn tham khảo ý kiến bác sĩ chuyên khoa trước khi sử dụng thuốc.
                    </Typography>
                </Alert>
            )}

            {/* Hiển thị kết quả tương tác */}
            {Object.keys(interactions).length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mb: { xs: 1.5, sm: 2 }, 
                            color: "#1976d2", 
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0.5, sm: 1 },
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            flexDirection: { xs: "column", sm: "row" },
                            textAlign: { xs: "center", sm: "left" },
                            p: { xs: 2, sm: 0 },
                            backgroundColor: { xs: "#f3f8ff", sm: "transparent" },
                            borderRadius: { xs: 2, sm: 0 },
                            border: { xs: "1px solid #e3f2fd", sm: "none" }
                        }}
                    >
                        <WarningAmberIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        <Box component="span" sx={{ mt: { xs: 0.5, sm: 0 } }}>
                            Kết quả kiểm tra tương tác
                        </Box>
                    </Typography>
                    {renderInteractionResults()}
                </Box>
            )}

            {/* Snackbar thông báo thành công */}
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ActiveIngredientSearch;