import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardActions,
    IconButton,
    Alert,
    CircularProgress,
    Chip,
    Snackbar,
} from "@mui/material";
import {
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Close as CloseIcon,
    PictureAsPdf as PdfIcon,
    ImageSearch,
} from "@mui/icons-material";
import { detectDrugsFromImages } from "../services/interactionService";

const PrescriptionUpload = ({ onFilesUploaded }) => {
    const [open, setOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [previewFile, setPreviewFile] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    // Snackbar states
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", // success, error, warning, info
    });

    // Mở dialog upload
    const handleOpenDialog = () => {
        setOpen(true);
        setError("");
    };

    // Đóng dialog upload
    const handleCloseDialog = () => {
        setOpen(false);
        setUploadedFiles([]);
        setError("");
    };

    // Xử lý chọn file
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = [];
        let hasError = false;

        files.forEach((file) => {
            // Kiểm tra loại file (chỉ cho phép ảnh và PDF)
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ];

            if (!allowedTypes.includes(file.type)) {
                setError("Chỉ chấp nhận file ảnh (JPEG, PNG, WebP) hoặc PDF");
                hasError = true;
                return;
            }

            // Kiểm tra kích thước file (tối đa 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("Kích thước file không được vượt quá 5MB");
                hasError = true;
                return;
            }

            validFiles.push(file);
        });

        if (!hasError && validFiles.length > 0) {
            // Tạo preview cho các file
            const filesWithPreview = validFiles.map((file) => ({
                file,
                id: Date.now() + Math.random(),
                name: file.name,
                type: file.type,
                size: file.size,
                preview: file.type.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : null,
            }));

            setUploadedFiles((prev) => [...prev, ...filesWithPreview]);
            setError("");
        }
    };

    // Xóa file
    const handleRemoveFile = (fileId) => {
        setUploadedFiles((prev) => {
            const updatedFiles = prev.filter((f) => f.id !== fileId);
            // Revoke object URL để tránh memory leak
            const fileToRemove = prev.find((f) => f.id === fileId);
            if (fileToRemove && fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return updatedFiles;
        });
    };

    // Xem preview file
    const handlePreviewFile = (file) => {
        setPreviewFile(file);
        setPreviewOpen(true);
    };

    // Đóng preview
    const handleClosePreview = () => {
        setPreviewOpen(false);
        setPreviewFile(null);
    };

    // Đóng Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    // Xử lý hoàn tất - gọi API detect-drug
    const handleUploadFiles = async () => {
        if (uploadedFiles.length === 0) {
            setError("Vui lòng chọn ít nhất 1 file để tải lên");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Chuyển đổi files thành base64
            const filesData = await Promise.all(
                uploadedFiles.map(async (fileObj) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            resolve({
                                name: fileObj.name,
                                type: fileObj.type,
                                size: fileObj.size,
                                base64: e.target.result.split(",")[1], // Chỉ lấy phần base64 (bỏ prefix data:image/...;base64,)
                                mimeType: fileObj.type,
                            });
                        };
                        reader.readAsDataURL(fileObj.file);
                    });
                })
            );

            // Chuẩn bị data để gửi API theo format yêu cầu
            const requestBody = {
                Base64DocumentUrl: filesData.map((file) => file.base64),
            };

            // Gọi API thông qua service
            const result = await detectDrugsFromImages(
                requestBody.Base64DocumentUrl
            );

            console.log("response:", result);

            if (result.status === 200) {
                if (
                    result.data &&
                    Array.isArray(result.data) &&
                    result.data.length > 0
                ) {
                    // Trường hợp 1: Tìm thấy thuốc
                    const detectedDrugs = result.data;

                    // Đóng dialog trước
                    handleCloseDialog();

                    // Trả về dữ liệu cho component cha để thêm vào danh sách
                    if (onFilesUploaded) {
                        onFilesUploaded({
                            originalFiles: filesData,
                            apiResult: result,
                            detectedDrugs: detectedDrugs,
                            shouldAddToDrugList: true, // Flag để biết cần thêm vào danh sách
                        });
                    }
                    // Hiển thị thông báo thành công bằng Snackbar
                    setSnackbar({
                        open: true,
                        message: `Trích xuất thành công!`,
                        severity: "success",
                    });
                } else {
                    // Trường hợp 2: Không tìm thấy thuốc
                    // handleCloseDialog();
                    setSnackbar({
                        open: true,
                        message: `Có lỗi: ${result.message}!`,
                        severity: "warning",
                    });
                }
            } else {
                // Trường hợp 3: Lỗi (status 400 hoặc khác)
                // handleCloseDialog();
                setSnackbar({
                    open: true,
                    message: `Lỗi trích xuất: ${result.message}!`,
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("❌ Lỗi khi gọi API detect-drug:", error);

            // Kiểm tra nếu error có chứa response từ API backend
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // Trường hợp backend trả về error với format chuẩn
                if (errorData.status === 400 && errorData.message) {
                    setError(`❌ ${errorData.message}`);
                } else {
                    const status = error.response.status;
                    const message = errorData.message || error.message;

                    if (status === 401) {
                        setError(
                            "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
                        );
                    } else if (status === 404) {
                        setError(
                            "⚠️ API endpoint không tồn tại. Backend team cần tạo route /api/interactions/detect-drug"
                        );
                    } else if (status === 413) {
                        setError("File quá lớn. Vui lòng chọn file nhỏ hơn.");
                    } else {
                        setError(`Lỗi server (${status}): ${message}`);
                    }
                }
            } else if (error.request) {
                // Lỗi network/connection
                setError(
                    "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
                );
            } else {
                // Lỗi khác
                setError(
                    error.message ||
                        "Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <>
            {/* Nút Tải lên */}
            <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={handleOpenDialog}
                sx={{
                    py: { xs: 1.5, sm: 1.8 },
                    px: { xs: 1.5, sm: 2 },
                    height: { xs: "56px", sm: "56px" },
                    minWidth: { xs: "100%", sm: "146px" },
                    background: "linear-gradient(90deg, #2e7d32, #388e3c)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    textTransform: "none",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(46, 125, 50, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        background: "linear-gradient(90deg, #1b5e20, #2e7d32)",
                        boxShadow: "0 4px 12px rgba(46, 125, 50, 0.4)",
                        transform: "translateY(-1px)",
                    },
                }}
            >
                Tải lên
            </Button>

            {/* Dialog Upload */}
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "#f8f9fa",
                        borderBottom: "1px solid #e0e0e0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 600,
                            color: "#2e7d32",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        }}
                    >
                        📋 Trích xuất tên thuốc tự động
                    </Typography>
                    <p></p>
                    <IconButton
                        onClick={handleCloseDialog}
                        size="small"
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Khu vực upload */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            hidden
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileSelect}
                        />
                        <Button
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            component="label"
                            htmlFor="file-upload"
                            sx={{
                                backgroundColor: "#2e7d32",
                                color: "#fff",
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: "1rem",
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "0 2px 8px rgba(46, 125, 50, 0.3)",
                                "&:hover": {
                                    backgroundColor: "#1b5e20",
                                    boxShadow:
                                        "0 4px 12px rgba(46, 125, 50, 0.4)",
                                },
                            }}
                        >
                            Tải ảnh lên
                        </Button>
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                fontSize: "0.875rem",
                                color: "#666",
                                textAlign: "center",
                                lineHeight: 1.4,
                            }}
                        >
                            Nhấn để tải một hoặc nhiều ảnh toa thuốc để trích
                            xuất
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                mt: 0.5,
                                fontSize: "0.75rem",
                                color: "#999",
                                textAlign: "center",
                            }}
                        >
                            Hỗ trợ: JPEG, PNG, WebP (tối đa 5MB mỗi file)
                        </Typography>
                    </Box>

                    {/* Hiển thị lỗi */}
                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 2,
                                borderRadius: 2,
                                "& .MuiAlert-message": {
                                    fontSize: {
                                        xs: "0.875rem",
                                        sm: "0.875rem",
                                    },
                                },
                            }}
                            onClose={() => setError("")}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Danh sách files đã chọn */}
                    {uploadedFiles.length > 0 && (
                        <Box sx={{ mt: 3, position: "relative" }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    mb: 2,
                                    fontWeight: "bold",
                                    color: "#2e7d32",
                                    fontSize: { xs: "1rem", sm: "1.1rem" },
                                }}
                            >
                                Files đã chọn ({uploadedFiles.length})
                            </Typography>

                            <Grid container spacing={2}>
                                {uploadedFiles.map((fileObj) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={fileObj.id}
                                    >
                                        <Card
                                            sx={{
                                                height: "100%",
                                                borderRadius: 2,
                                                boxShadow:
                                                    "0 2px 8px rgba(0,0,0,0.1)",
                                                transition:
                                                    "transform 0.2s ease, box-shadow 0.2s ease",
                                                position: "relative",
                                                overflow: "hidden",
                                                "&:hover": {
                                                    transform:
                                                        "translateY(-2px)",
                                                    boxShadow:
                                                        "0 4px 16px rgba(0,0,0,0.15)",
                                                },
                                            }}
                                        >
                                            {fileObj.type.startsWith(
                                                "image/"
                                            ) ? (
                                                <CardMedia
                                                    component="img"
                                                    height="120"
                                                    image={fileObj.preview}
                                                    alt={fileObj.name}
                                                    sx={{
                                                        objectFit: "cover",
                                                        borderTopLeftRadius: 2,
                                                        borderTopRightRadius: 2,
                                                    }}
                                                />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        height: 120,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        backgroundColor:
                                                            "#f5f5f5",
                                                        borderTopLeftRadius: 2,
                                                        borderTopRightRadius: 2,
                                                    }}
                                                >
                                                    <PdfIcon
                                                        sx={{
                                                            fontSize: 48,
                                                            color: "#d32f2f",
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                            <Box sx={{ p: 1.5 }}>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    noWrap
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: "0.75rem",
                                                        mb: 1,
                                                    }}
                                                >
                                                    {fileObj.name}
                                                </Typography>
                                                <Chip
                                                    label={formatFileSize(
                                                        fileObj.size
                                                    )}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        fontSize: "0.7rem",
                                                        height: "20px",
                                                    }}
                                                />
                                            </Box>
                                            <CardActions
                                                sx={{
                                                    justifyContent:
                                                        "space-between",
                                                    p: 1,
                                                    pt: 0,
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handlePreviewFile(
                                                            fileObj
                                                        )
                                                    }
                                                    color="primary"
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "rgba(25, 118, 210, 0.1)",
                                                        },
                                                    }}
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleRemoveFile(
                                                            fileObj.id
                                                        )
                                                    }
                                                    color="error"
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "rgba(211, 47, 47, 0.1)",
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </CardActions>

                                            {/* Shimmer overlay khi đang loading */}
                                            {loading && (
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        backgroundColor:
                                                            "rgba(255, 255, 255, 0.9)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        borderRadius: 2,
                                                        "&::before": {
                                                            content: '""',
                                                            position:
                                                                "absolute",
                                                            top: 0,
                                                            left: "-100%",
                                                            width: "100%",
                                                            height: "100%",
                                                            background:
                                                                "linear-gradient(90deg, transparent, rgba(46, 125, 50, 0.4), transparent)",
                                                            animation:
                                                                "shimmer 1.5s infinite",
                                                        },
                                                        "@keyframes shimmer": {
                                                            "0%": {
                                                                transform:
                                                                    "translateX(-100%)",
                                                            },
                                                            "100%": {
                                                                transform:
                                                                    "translateX(300%)",
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: "#2e7d32",
                                                            fontWeight: 600,
                                                            fontSize:
                                                                "0.875rem",
                                                            textAlign: "center",
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        Đang trích xuất...
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions
                    sx={{
                        p: 3,
                        backgroundColor: "#f8f9fa",
                        borderTop: "1px solid #e0e0e0",
                        gap: 2,
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        onClick={handleCloseDialog}
                        disabled={loading}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 500,
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                        }}
                    >
                        Hủy
                    </Button>
                    {uploadedFiles.length > 0 && (
                        <Button
                            variant="contained"
                            onClick={handleUploadFiles}
                            disabled={loading}
                            startIcon={
                                loading ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                        sx={{ mb: 0.15 }}
                                    />
                                ) : (
                                    <ImageSearch sx={{ mb: 0.15 }} />
                                )
                            }
                            sx={{
                                px: 4,
                                py: 1,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                background:
                                    "linear-gradient(90deg, #2e7d32, #388e3c)",
                                boxShadow: "0 2px 8px rgba(46, 125, 50, 0.3)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(90deg, #1b5e20, #2e7d32)",
                                    boxShadow:
                                        "0 4px 12px rgba(46, 125, 50, 0.4)",
                                },
                                "&:disabled": {
                                    background: "#ccc",
                                    color: "#666",
                                },
                            }}
                        >
                            {loading ? "Vui lòng đợi" : "Trích xuất"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* Dialog Preview */}
            <Dialog
                open={previewOpen}
                onClose={handleClosePreview}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">{previewFile?.name}</Typography>
                    <IconButton onClick={handleClosePreview} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    {previewFile &&
                        (previewFile.type.startsWith("image/") ? (
                            <img
                                src={previewFile.preview}
                                alt={previewFile.name}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: "70vh",
                                    objectFit: "contain",
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                    backgroundColor: "#f5f5f5",
                                    minHeight: "300px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <PdfIcon
                                    sx={{
                                        fontSize: 80,
                                        color: "#d32f2f",
                                        mb: 2,
                                    }}
                                />
                                <Typography variant="h6" gutterBottom>
                                    File PDF
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {previewFile.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ mt: 1 }}
                                >
                                    Kích thước:{" "}
                                    {formatFileSize(previewFile.size)}
                                </Typography>
                            </Box>
                        ))}
                </DialogContent>
            </Dialog>

            {/* Snackbar cho thông báo */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{
                        width: "100%",
                        maxWidth: "500px",
                        fontSize: "0.95rem",
                        "& .MuiAlert-message": {
                            padding: "8px 0",
                        },
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default PrescriptionUpload;
