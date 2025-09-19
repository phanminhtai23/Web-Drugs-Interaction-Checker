import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  Pagination,
  InputAdornment,
} from '@mui/material';
import { Delete, Edit, Add, Search, Medication, LocalHospital, Healing } from '@mui/icons-material';

const PrescriptionManagementPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ doctor_name: '', hospital: '', medications: '' });
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchPrescriptions = async () => {
    const response = await axios.get('/prescriptions');
    setPrescriptions(response.data);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleOpen = (prescription = null) => {
    if (prescription) {
      setFormData({
        doctor_name: prescription.doctor_name,
        hospital: prescription.hospital,
        medications: prescription.medications.map((m) => `${m.name} (${m.dosage})`).join(', '),
      });
      setEditingId(prescription._id);
    } else {
      setFormData({ doctor_name: '', hospital: '', medications: '' });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const medications = formData.medications.split(',').map((m) => {
      const [name, dosage] = m.trim().split('(');
      return { name: name.trim(), dosage: dosage?.replace(')', '').trim() || '' };
    });

    try {
      if (editingId) {
        await axios.put(`/prescriptions/${editingId}`, { ...formData, medications });
        setSnackbar({ open: true, message: 'Đơn thuốc đã được cập nhật!', severity: 'success' });
      } else {
        await axios.post('/prescriptions', { ...formData, medications });
        setSnackbar({ open: true, message: 'Đơn thuốc đã được thêm!', severity: 'success' });
      }
      fetchPrescriptions();
      handleClose();
    } catch (error) {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra!', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/prescriptions/${id}`);
      setSnackbar({ open: true, message: 'Đơn thuốc đã được xóa!', severity: 'success' });
      fetchPrescriptions();
    } catch (error) {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra!', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.doctor_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPrescriptions = filteredPrescriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: { xs: 2, sm: 3, md: 5 }, p: { xs: 2, sm: 3 } }}>
      {/* Tiêu đề */}
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #000000FF, #000000FF)', // Gradient màu sắc nổi bật hơn
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: { xs: 3, sm: 4 },
          animation: 'fadeIn 1s ease-in-out', // Hiệu ứng động khi xuất hiện
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }, // Kích thước chữ linh hoạt
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 0.5, sm: 1 }, // Khoảng cách giữa biểu tượng và chữ
          flexDirection: { xs: 'column', sm: 'row' }, // Column trên mobile
        }}
      >
        <Medication
          sx={{
            fontSize: { xs: 30, sm: 40, md: 60 }, // Biểu tượng lớn hơn
            color: 'linear-gradient(to right, #6a11cb, #2575fc)',
            mb: { xs: 1, sm: 0 }, // Margin bottom trên mobile
          }}
        />
        Quản lý đơn thuốc
      </Typography>

      {/* Thanh tìm kiếm */}
      <TextField
      fullWidth
      placeholder="Tìm kiếm theo tên bác sĩ..."
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{
        mb: { xs: 2, sm: 3 },
        background: 'linear-gradient(to right, #f3f4f6, #ffffff)', // Gradient nền
        borderRadius: { xs: '20px', sm: '30px' }, // Bo góc mềm mại responsive
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Hiệu ứng shadow
        '& .MuiOutlinedInput-root': {
          borderRadius: { xs: '20px', sm: '30px' }, // Bo góc cho input responsive
          fontSize: { xs: '0.9rem', sm: '1rem' }, // Font size responsive
          '& fieldset': {
            border: 'none', // Loại bỏ viền mặc định
          },
          '&:hover fieldset': {
            border: '2px solid #2196f3', // Viền khi hover
          },
          '&.Mui-focused fieldset': {
            border: '2px solid #21cbf3', // Viền khi focus
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search
              sx={{
                color: '#2196f3', // Màu biểu tượng
                fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Kích thước biểu tượng responsive
                transition: 'transform 0.3s ease', // Hiệu ứng động
                '&:hover': {
                  transform: 'scale(1.2)', // Phóng to khi hover
                },
              }}
            />
          </InputAdornment>
        ),
      }}
    />

      {/* Nút thêm đơn thuốc */}
      <Button
        variant="contained"
        startIcon={<Add sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
        onClick={() => handleOpen()}
        sx={{
          mb: { xs: 2, sm: 3 },
          background: 'linear-gradient(to right, #2196f3, #21cbf3)',
          color: '#fff',
          fontWeight: 'bold',
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.5 },
          borderRadius: { xs: '20px', sm: '30px' },
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          fontSize: { xs: '0.875rem', sm: '1rem' },
          width: { xs: '100%', sm: 'auto' }, // Full width trên mobile
          '&:hover': {
            background: 'linear-gradient(to right, #21cbf3, #2196f3)',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        Thêm đơn thuốc
      </Button>


      {/* Danh sách đơn thuốc */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {paginatedPrescriptions.map((prescription) => (
          <Grid item xs={12} sm={6} md={4} key={prescription._id}>
            <Card
              elevation={3}
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: 'linear-gradient(to right, #f3f4f6, #ffffff)', // Nền gradient sáng
                borderRadius: { xs: '12px', sm: '15px' }, // Bo góc mềm mại responsive
                height: '100%', // Đảm bảo cards có chiều cao đồng đều
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: { xs: 'scale(1.02)', sm: 'scale(1.05)' }, // Phóng to nhẹ hơn trên mobile
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)', // Shadow khi hover
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Bác sĩ: {prescription.doctor_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    textAlign: 'center',
                    mb: 2,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                >
                  Bệnh viện: {prescription.hospital}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: { xs: 0.5, sm: 1 },
                    mt: 2,
                  }}
                >
                  {prescription.medications.map((m, index) => (
                    <Chip
                      key={index}
                      label={`${m.name} (${m.dosage})`}
                      color="primary"
                      variant="outlined"
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 'bold',
                        borderRadius: { xs: '15px', sm: '20px' }, // Bo góc mềm mại responsive
                        background: '#e3f2fd', // Nền sáng
                        color: '#1976d2', // Màu chữ
                        height: { xs: '28px', sm: '32px' }, // Chiều cao responsive
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: { xs: '8px', sm: '10px' },
                  mt: 'auto', // Đẩy actions xuống dưới
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleOpen(prescription)}
                  sx={{
                    transition: 'transform 0.3s ease',
                    p: { xs: 1, sm: 1.5 }, // Padding responsive
                    '&:hover': {
                      transform: 'scale(1.2)', // Phóng to khi hover
                    },
                  }}
                >
                  <Edit sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(prescription._id)}
                  sx={{
                    transition: 'transform 0.3s ease',
                    p: { xs: 1, sm: 1.5 }, // Padding responsive
                    '&:hover': {
                      transform: 'scale(1.2)', // Phóng to khi hover
                    },
                  }}
                >
                  <Delete sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Phân trang */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, sm: 3 } }}>
        <Pagination
          count={Math.ceil(filteredPrescriptions.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
          size="medium" // Sửa lỗi: không thể truyền object cho size
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Font size responsive
              minWidth: { xs: '28px', sm: '32px' }, // Min width responsive
              height: { xs: '28px', sm: '32px' }, // Height responsive
            },
          }}
        />
      </Box>

      {/* Dialog thêm/sửa đơn thuốc */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: { xs: 0, sm: '15px' }, // Bo góc cho desktop
            m: { xs: 0, sm: 2 }, // Margin cho desktop
          },
          // Responsive fullScreen behavior
          '@media (max-width: 600px)': {
            '& .MuiDialog-container': {
              alignItems: 'stretch',
            },
            '& .MuiDialog-paper': {
              margin: 0,
              maxHeight: '100vh',
              height: '100vh',
              borderRadius: 0,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
            background: 'linear-gradient(to right, #2196f3, #2575fc)', // Gradient tiêu đề
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: { xs: 1, sm: 2 },
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 2.5 },
          }}
        >
          {editingId ? 'Sửa đơn thuốc' : 'Thêm đơn thuốc'}
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 1.5, sm: 2 }, // Khoảng cách giữa các trường responsive
            padding: { xs: '16px', sm: '20px' },
          }}
        >
          <TextField
            label="Tên bác sĩ"
            fullWidth
            margin="normal"
            value={formData.doctor_name}
            onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
            placeholder="Nhập tên bác sĩ"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Medication sx={{ color: '#2196f3', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: '#f9f9f9',
              borderRadius: { xs: '8px', sm: '10px' },
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#2196f3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2575fc',
                },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
              },
            }}
          />
          <TextField
            label="Bệnh viện"
            fullWidth
            margin="normal"
            value={formData.hospital}
            onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
            placeholder="Nhập tên bệnh viện"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalHospital sx={{ color: '#2196f3', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: '#f9f9f9',
              borderRadius: { xs: '8px', sm: '10px' },
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#2196f3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2575fc',
                },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
              },
            }}
          />
          <TextField
            label="Thuốc (dạng: Tên (Liều lượng), cách nhau bởi dấu phẩy)"
            fullWidth
            margin="normal"
            multiline
            rows={{ xs: 3, sm: 2 }} // Nhiều dòng hơn trên mobile
            value={formData.medications}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            placeholder="Ví dụ: Paracetamol (500mg), Ibuprofen (200mg)"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                  <Healing sx={{ color: '#2196f3', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: '#f9f9f9',
              borderRadius: { xs: '8px', sm: '10px' },
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#2196f3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2575fc',
                },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.9rem', sm: '1rem' },
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            padding: { xs: '16px', sm: '20px' },
            gap: { xs: 1, sm: 2 }, // Khoảng cách giữa các nút
            flexDirection: { xs: 'column', sm: 'row' }, // Column trên mobile
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: '#FF1100FF',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              width: { xs: '100%', sm: 'auto' }, // Full width trên mobile
              py: { xs: 1.5, sm: 1 },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #21cbf3, #2196f3)', // Gradient nút lưu
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              padding: { xs: '12px 20px', sm: '10px 20px' },
              borderRadius: { xs: '20px', sm: '30px' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              width: { xs: '100%', sm: 'auto' }, // Full width trên mobile
              '&:hover': {
                background: 'linear-gradient(to right,#21cbf3, #2196f3)',
              },
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Sửa lỗi: không thể truyền object responsive
        sx={{
          '& .MuiSnackbarContent-root': {
            fontSize: { xs: '0.875rem', sm: '1rem' },
          },
        }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PrescriptionManagementPage;