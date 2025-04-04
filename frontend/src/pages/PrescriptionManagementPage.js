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
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5, p: 3 }}>
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
          mb: 4,
          animation: 'fadeIn 1s ease-in-out', // Hiệu ứng động khi xuất hiện
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, // Kích thước chữ linh hoạt
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1, // Khoảng cách giữa biểu tượng và chữ
        }}
      >
        <Medication
          sx={{
            fontSize: { xs: 40, sm: 50, md: 60 }, // Biểu tượng lớn hơn
            color: 'linear-gradient(to right, #6a11cb, #2575fc)',
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
        mb: 3,
        background: 'linear-gradient(to right, #f3f4f6, #ffffff)', // Gradient nền
        borderRadius: '30px', // Bo góc mềm mại
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Hiệu ứng shadow
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px', // Bo góc cho input
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
                fontSize: '1.5rem', // Kích thước biểu tượng
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
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{
          mb: 3,
          background: 'linear-gradient(to right, #2196f3, #21cbf3)',
          color: '#fff',
          fontWeight: 'bold',
          px: 3,
          py: 1.5,
          borderRadius: '30px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            background: 'linear-gradient(to right, #21cbf3, #2196f3)',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        Thêm đơn thuốc
      </Button>


      {/* Danh sách đơn thuốc */}
      <Grid container spacing={3}>
        {paginatedPrescriptions.map((prescription) => (
          <Grid item xs={12} sm={6} md={4} key={prescription._id}>
            <Card
              elevation={3}
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: 'linear-gradient(to right, #f3f4f6, #ffffff)', // Nền gradient sáng
                borderRadius: '15px', // Bo góc mềm mại
                '&:hover': {
                  transform: 'scale(1.05)', // Phóng to khi hover
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)', // Shadow khi hover
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
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
                  }}
                >
                  Bệnh viện: {prescription.hospital}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 1,
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
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        borderRadius: '20px', // Bo góc mềm mại
                        background: '#e3f2fd', // Nền sáng
                        color: '#1976d2', // Màu chữ
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '10px',
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleOpen(prescription)}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.2)', // Phóng to khi hover
                    },
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(prescription._id)}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.2)', // Phóng to khi hover
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Phân trang */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredPrescriptions.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>

      {/* Dialog thêm/sửa đơn thuốc */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '1.8rem',
            background: 'linear-gradient(to right, #2196f3, #2575fc)', // Gradient tiêu đề
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          {editingId ? 'Sửa đơn thuốc' : 'Thêm đơn thuốc'}
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, // Khoảng cách giữa các trường
            padding: '20px',
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
                  <Medication sx={{ color: '#2196f3' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: '#f9f9f9',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
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
                  <LocalHospital sx={{ color: '#2196f3' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: '#f9f9f9',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
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
            }}
          />
          <TextField
            label="Thuốc (dạng: Tên (Liều lượng), cách nhau bởi dấu phẩy)"
            fullWidth
            margin="normal"
            value={formData.medications}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            placeholder="Ví dụ: Paracetamol (500mg), Ibuprofen (200mg)"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Healing sx={{ color: '#2196f3' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: '#f9f9f9',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
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
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: '#FF1100FF',
              fontWeight: 'bold',
              textTransform: 'none',
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
              padding: '10px 20px',
              borderRadius: '30px',
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PrescriptionManagementPage;