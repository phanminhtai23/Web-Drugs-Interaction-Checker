import React, { useState } from 'react';
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
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Close as CloseIcon,
    PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import { detectDrugsFromImages } from '../services/interactionService';

const PrescriptionUpload = ({ onFilesUploaded }) => {
    const [open, setOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [previewFile, setPreviewFile] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    // Mở dialog upload
    const handleOpenDialog = () => {
        setOpen(true);
        setError('');
    };

    // Đóng dialog upload
    const handleCloseDialog = () => {
        setOpen(false);
        setUploadedFiles([]);
        setError('');
    };

    // Xử lý chọn file
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = [];
        let hasError = false;

        files.forEach(file => {
            // Kiểm tra loại file (chỉ cho phép ảnh và PDF)
            const allowedTypes = [
                'image/jpeg', 
                'image/jpg', 
                'image/png', 
                'image/webp',
                'application/pdf'
            ];
            
            if (!allowedTypes.includes(file.type)) {
                setError('Chỉ chấp nhận file ảnh (JPEG, PNG, WebP) hoặc PDF');
                hasError = true;
                return;
            }

            // Kiểm tra kích thước file (tối đa 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Kích thước file không được vượt quá 5MB');
                hasError = true;
                return;
            }

            validFiles.push(file);
        });

        if (!hasError && validFiles.length > 0) {
            // Tạo preview cho các file
            const filesWithPreview = validFiles.map(file => ({
                file,
                id: Date.now() + Math.random(),
                name: file.name,
                type: file.type,
                size: file.size,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
            }));

            setUploadedFiles(prev => [...prev, ...filesWithPreview]);
            setError('');
        }
    };

    // Xóa file
    const handleRemoveFile = (fileId) => {
        setUploadedFiles(prev => {
            const updatedFiles = prev.filter(f => f.id !== fileId);
            // Revoke object URL để tránh memory leak
            const fileToRemove = prev.find(f => f.id === fileId);
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

    // Xử lý hoàn tất - gọi API detect-drug
    const handleUploadFiles = async () => {
        if (uploadedFiles.length === 0) {
            setError('Vui lòng chọn ít nhất 1 file để tải lên');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Chuyển đổi files thành base64
            const filesData = await Promise.all(
                uploadedFiles.map(async (fileObj) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            resolve({
                                name: fileObj.name,
                                type: fileObj.type,
                                size: fileObj.size,
                                base64: e.target.result.split(',')[1], // Chỉ lấy phần base64 (bỏ prefix data:image/...;base64,)
                                mimeType: fileObj.type
                            });
                        };
                        reader.readAsDataURL(fileObj.file);
                    });
                })
            );

            // Chuẩn bị data để gửi API theo format yêu cầu
            const requestBody = {
                Base64DocumentUrl: filesData.map(file => file.base64)
            };

            console.log('=== ĐANG GỬI DỮ LIỆU CHO API ===');
            console.log('Số lượng files:', requestBody.Base64DocumentUrl.length);
            console.log('Request body:', {
                Base64DocumentUrl: requestBody.Base64DocumentUrl.map(base64 => 
                    base64.substring(0, 50) + '...' // Chỉ hiển thị 50 ký tự đầu
                )
            });

            // Gọi API thông qua service
            const result = await detectDrugsFromImages(requestBody.Base64DocumentUrl);
            
            console.log('=== PHẢN HỒI TỪ API ===');
            console.log('Success:', result.success);
            console.log('Data:', result.data);

            // Xử lý kết quả thành công
            if (result.success) {
                alert(`✅ Phân tích thành công! 
                
Đã phát hiện thuốc từ ${requestBody.Base64DocumentUrl.length} ảnh.
Kiểm tra Console để xem chi tiết kết quả.`);

                // Trả về dữ liệu cho component cha nếu cần
                if (onFilesUploaded) {
                    onFilesUploaded({
                        originalFiles: filesData,
                        apiResult: result.data
                    });
                }

                // Đóng dialog sau khi hoàn tất
                handleCloseDialog();
            } else {
                throw new Error(result.message || 'Có lỗi xảy ra từ API');
            }
            
        } catch (error) {
            console.error('❌ Lỗi khi gọi API detect-drug:', error);
            
            // Hiển thị lỗi cụ thể từ service/API
            if (error.response) {
                // Lỗi từ server (có response status code)
                const status = error.response.status;
                const message = error.response.data?.message || error.message;
                
                if (status === 401) {
                    setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                } else if (status === 404) {
                    setError('⚠️ API endpoint không tồn tại. Backend team cần tạo route /api/interactions/detect-drug');
                } else if (status === 413) {
                    setError('File quá lớn. Vui lòng chọn file nhỏ hơn.');
                } else {
                    setError(`Lỗi server (${status}): ${message}`);
                }
            } else if (error.request) {
                // Lỗi network/connection
                setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
            } else {
                // Lỗi khác
                setError(error.message || 'Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                    px: { xs: 3, sm: 4 },
                    height: { xs: "56px", sm: "60px" },
                    minWidth: { xs: "100%", sm: "140px" },
                    background: "linear-gradient(90deg, #2e7d32, #388e3c)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    textTransform: "none",
                    borderRadius: 3,
                    boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
                    transition: 'all 0.3s ease',
                    "&:hover": {
                        background: "linear-gradient(90deg, #1b5e20, #2e7d32)",
                        boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
                        transform: 'translateY(-1px)'
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
                    sx: { borderRadius: 3 }
                }}
            >
                <DialogTitle sx={{ 
                    backgroundColor: '#f8f9fa', 
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2.5
                }}>
                    <Typography 
                        variant="h6" 
                        component="div"
                        sx={{
                            fontWeight: 600,
                            color: '#2e7d32',
                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                    >
                        📋 Tải lên toa thuốc
                    </Typography>
                    <IconButton 
                        onClick={handleCloseDialog} 
                        size="small"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Khu vực upload */}
                    <Box
                        sx={{
                            border: '2px dashed #e0e0e0',
                            borderRadius: 3,
                            p: { xs: 3, sm: 4 },
                            textAlign: 'center',
                            mb: 3,
                            backgroundColor: '#fafafa',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            minHeight: { xs: '180px', sm: '200px' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                borderColor: '#2e7d32',
                                backgroundColor: '#f1f8e9',
                                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)'
                            }
                        }}
                        component="label"
                    >
                        <input
                            type="file"
                            hidden
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileSelect}
                        />
                        <CloudUploadIcon 
                            sx={{ 
                                fontSize: { xs: 40, sm: 48 }, 
                                color: '#2e7d32', 
                                mb: 2,
                                opacity: 0.8 
                            }} 
                        />
                        <Typography 
                            variant="h6" 
                            gutterBottom
                            sx={{ 
                                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                fontWeight: 600,
                                color: '#2e7d32'
                            }}
                        >
                            Chọn ảnh hoặc file PDF
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                                fontSize: { xs: '0.875rem', sm: '0.875rem' },
                                mb: 1
                            }}
                        >
                            Kéo thả file vào đây hoặc nhấn để chọn
                        </Typography>
                        <Typography 
                            variant="caption" 
                            display="block" 
                            sx={{ 
                                mt: 1,
                                fontSize: { xs: '0.75rem', sm: '0.75rem' },
                                color: '#666',
                                backgroundColor: '#fff',
                                px: 2,
                                py: 0.5,
                                borderRadius: 1,
                                border: '1px solid #e0e0e0'
                            }}
                        >
                            Hỗ trợ: JPEG, PNG, WebP, PDF (tối đa 5MB mỗi file)
                        </Typography>
                    </Box>

                    {/* Hiển thị lỗi */}
                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ 
                                mb: 2,
                                borderRadius: 2,
                                '& .MuiAlert-message': {
                                    fontSize: { xs: '0.875rem', sm: '0.875rem' }
                                }
                            }}
                            onClose={() => setError('')}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Danh sách files đã chọn */}
                    {uploadedFiles.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    mb: 2, 
                                    fontWeight: 'bold',
                                    color: '#2e7d32',
                                    fontSize: { xs: '1rem', sm: '1.1rem' }
                                }}
                            >
                                Files đã chọn ({uploadedFiles.length})
                            </Typography>
                            <Grid container spacing={2}>
                                {uploadedFiles.map((fileObj) => (
                                    <Grid item xs={12} sm={6} md={4} key={fileObj.id}>
                                        <Card 
                                            sx={{ 
                                                height: '100%',
                                                borderRadius: 2,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                                                }
                                            }}
                                        >
                                            {fileObj.type.startsWith('image/') ? (
                                                <CardMedia
                                                    component="img"
                                                    height="120"
                                                    image={fileObj.preview}
                                                    alt={fileObj.name}
                                                    sx={{ 
                                                        objectFit: 'cover',
                                                        borderTopLeftRadius: 2,
                                                        borderTopRightRadius: 2
                                                    }}
                                                />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        height: 120,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#f5f5f5',
                                                        borderTopLeftRadius: 2,
                                                        borderTopRightRadius: 2
                                                    }}
                                                >
                                                    <PdfIcon sx={{ fontSize: 48, color: '#d32f2f' }} />
                                                </Box>
                                            )}
                                            <Box sx={{ p: 1.5 }}>
                                                <Typography 
                                                    variant="caption" 
                                                    display="block" 
                                                    noWrap
                                                    sx={{ 
                                                        fontWeight: 500,
                                                        fontSize: '0.75rem',
                                                        mb: 1
                                                    }}
                                                >
                                                    {fileObj.name}
                                                </Typography>
                                                <Chip 
                                                    label={formatFileSize(fileObj.size)}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ 
                                                        fontSize: '0.7rem',
                                                        height: '20px'
                                                    }}
                                                />
                                            </Box>
                                            <CardActions sx={{ justifyContent: 'space-between', p: 1, pt: 0 }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handlePreviewFile(fileObj)}
                                                    color="primary"
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(25, 118, 210, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveFile(fileObj.id)}
                                                    color="error"
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(211, 47, 47, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </CardActions>
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
                        backgroundColor: '#f8f9fa',
                        borderTop: '1px solid #e0e0e0',
                        gap: 2,
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button 
                        onClick={handleCloseDialog} 
                        disabled={loading}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleUploadFiles}
                        disabled={loading || uploadedFiles.length === 0}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                        sx={{
                            px: 4,
                            py: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            background: "linear-gradient(90deg, #2e7d32, #388e3c)",
                            boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
                            "&:hover": {
                                background: "linear-gradient(90deg, #1b5e20, #2e7d32)",
                                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
                            },
                            "&:disabled": {
                                background: "#ccc",
                                color: "#666"
                            }
                        }}
                    >
                        {loading ? 'Đang tải lên...' : 'Hoàn tất'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Preview */}
            <Dialog
                open={previewOpen}
                onClose={handleClosePreview}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6">
                        {previewFile?.name}
                    </Typography>
                    <IconButton onClick={handleClosePreview} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    {previewFile && (
                        previewFile.type.startsWith('image/') ? (
                            <img
                                src={previewFile.preview}
                                alt={previewFile.name}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '70vh',
                                    objectFit: 'contain'
                                }}
                            />
                        ) : (
                            <Box sx={{ 
                                p: 4, 
                                textAlign: 'center',
                                backgroundColor: '#f5f5f5',
                                minHeight: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <PdfIcon sx={{ fontSize: 80, color: '#d32f2f', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    File PDF
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {previewFile.name}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                    Kích thước: {formatFileSize(previewFile.size)}
                                </Typography>
                            </Box>
                        )
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PrescriptionUpload;