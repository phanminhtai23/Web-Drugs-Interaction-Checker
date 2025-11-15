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
} from "@mui/material";
import { Delete, Add, SwapVert } from "@mui/icons-material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ScienceIcon from "@mui/icons-material/Science";


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
                        mb: 3,
                        border: `2px solid ${config.color}`,
                        borderRadius: 3,
                        background: config.gradient,
                        boxShadow: `0 4px 20px rgba(0,0,0,0.1)`,
                        overflow: 'hidden',
                        '&:hover': {
                            boxShadow: `0 6px 25px rgba(0,0,0,0.15)`,
                            transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease-in-out'
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    background: `linear-gradient(45deg, ${config.color} 30%, ${config.color}80 90%)`,
                                    boxShadow: `0 4px 15px ${config.color}40`,
                                    mr: 2
                                }}
                            >
                                <IconComponent sx={{ color: 'white', fontSize: 24 }} />
                            </Box>
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{ 
                                        color: config.color, 
                                        fontWeight: "bold",
                                        mb: 0.5
                                    }}
                                >
                                    {severity}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ 
                                        color: `${config.color}CC`,
                                        fontWeight: 500
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
                                    p: 3,
                                    mb: 2,
                                    backgroundColor: "white",
                                    borderRadius: 2,
                                    border: `1px solid ${config.color}30`,
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                    '&:last-child': {
                                        mb: 0
                                    }
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: 'center' }}>
                                    <Chip
                                        label={interaction.hoatChat1}
                                        sx={{ 
                                            mr: 2, 
                                            background: config.chipGradient,
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            height: 36,
                                            boxShadow: `0 2px 8px ${config.color}40`,
                                            '& .MuiChip-label': {
                                                px: 2
                                            }
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            background: `linear-gradient(45deg, ${config.color}20 30%, ${config.color}40 90%)`,
                                            mx: 1
                                        }}
                                    >
                                        <SwapVert sx={{ color: config.color, fontSize: 20 }} />
                                    </Box>
                                    <Chip
                                        label={interaction.hoatChat2}
                                        sx={{ 
                                            ml: 2,
                                            background: config.chipGradient,
                                            color: "white",
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            height: 36,
                                            boxShadow: `0 2px 8px ${config.color}40`,
                                            '& .MuiChip-label': {
                                                px: 2
                                            }
                                        }}
                                    />
                                </Box>
                                
                                <Box
                                    sx={{
                                        p: 2,
                                        backgroundColor: `${config.color}08`,
                                        borderRadius: 1.5,
                                        borderLeft: `4px solid ${config.color}`
                                    }}
                                >
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: "#333",
                                            lineHeight: 1.6,
                                            fontWeight: 500
                                        }}
                                    >
                                        <Box component="span" sx={{ fontWeight: 700, color: config.color }}>
                                            Cảnh báo:
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
                mt: 5,
                p: { xs: 2, sm: 3 },
                backgroundColor: "#fff",
                borderRadius: 4,
                border: "1px solid #e0e0e0",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    mb: 3,
                    gap: { xs: 2, sm: 0 },
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
                            sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: 3 },
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
                            py: { xs: 1.5, sm: 1.8 },
                            px: { xs: 3, sm: 3 },
                            height: { xs: "56px", sm: "56px" },
                            minWidth: { xs: "100%", sm: "146px" },
                            background:
                                "linear-gradient(90deg, #1976d2, #155a9c)",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: { xs: "0.95rem", sm: "1rem" },
                            textTransform: "none",
                            borderRadius: 3,
                            "&:hover": {
                                background:
                                    "linear-gradient(90deg, #155a9c, #1976d2)",
                            },
                        }}
                    >
                        Thêm vào
                    </Button>
                </Box>
            </Box>

            {/* Danh sách hoạt chất */}
            {activeIngredientList.length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#333",
                                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                            }}
                        >
                            Danh sách hoạt chất ({activeIngredientList.length})
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<RestartAltIcon />}
                            onClick={handleReset}
                            size="small"
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                color: "#666",
                                borderColor: "#ccc",
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
                                    borderRadius: 2,
                                    mb: 1,
                                    px: 3,
                                    py: 2,
                                    "&:hover": {
                                        backgroundColor: "#e9ecef",
                                    },
                                }}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleRemoveActiveIngredient(ingredient)}
                                        sx={{
                                            color: "#dc3545",
                                            "&:hover": {
                                                backgroundColor: "#f8d7da",
                                            },
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    sx={{
                                        backgroundColor: "#1976d2",
                                        width: 36,
                                        height: 36,
                                        mr: 2,
                                    }}
                                >
                                    <ScienceIcon fontSize="small" />
                                </Avatar>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "500",
                                        color: "#333",
                                        fontSize: { xs: "0.9rem", sm: "1rem" },
                                    }}
                                >
                                    {ingredient}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleCheckInteraction}
                            disabled={loading || activeIngredientList.length < 2}
                            startIcon={
                                loading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    <ScienceIcon />
                                )
                            }
                            sx={{
                                flex: 1,
                                py: 1.5,
                                background:
                                    "linear-gradient(90deg, #1976d2, #155a9c)",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: { xs: "0.95rem", sm: "1rem" },
                                textTransform: "none",
                                borderRadius: 3,
                                "&:hover": {
                                    background:
                                        "linear-gradient(90deg, #155a9c, #1976d2)",
                                },
                                "&:disabled": {
                                    background: "#ccc",
                                    color: "#666",
                                },
                            }}
                        >
                            {loading ? "Đang kiểm tra..." : "Kiểm tra tương tác"}
                        </Button>

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
                                mt: 2,
                                textAlign: "center",
                                fontStyle: "italic",
                                color: "#666",
                            }}
                        >
                            Cần ít nhất 2 hoạt chất để kiểm tra tương tác
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
                    sx={{ mb: 2 }}
                    icon={<InfoIcon />}
                >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Không tìm thấy tương tác nào giữa các hoạt chất đã chọn.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
                        Kết quả này chỉ dựa trên dữ liệu hiện có. Luôn tham khảo ý kiến bác sĩ 
                        chuyên khoa trước khi sử dụng thuốc.
                    </Typography>
                </Alert>
            )}

            {/* Hiển thị kết quả tương tác */}
            {Object.keys(interactions).length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mb: 2, 
                            color: "#1976d2", 
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}
                    >
                        <WarningAmberIcon />
                        Kết quả kiểm tra tương tác
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