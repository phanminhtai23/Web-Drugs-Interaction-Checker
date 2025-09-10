import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import axios from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/contact', formData);
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Gửi tin nhắn thất bại. Vui lòng thử lại!',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 4, md: 6 },
        px: { xs: 1, sm: 2, md: 4 },
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        textAlign: 'center', 
        mb: { xs: 3, sm: 4, md: 6 },
        px: { xs: 1, sm: 2 }
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' }
          }}
        >
          Liên Hệ Với Chúng Tôi
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: 1.8,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            px: { xs: 1, sm: 0 }
          }}
        >
          Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua biểu mẫu dưới đây hoặc thông tin liên hệ.
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Thông tin liên hệ */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 3,
              background: '#fff',
              color: '#000',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              mb: { xs: 2, md: 0 }
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.primary.main, 
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
              }}
            >
              Thông Tin Liên Hệ
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: { xs: 1.5, sm: 2 },
              flexWrap: 'wrap'
            }}>
              <Email sx={{ 
                color: theme.palette.primary.main, 
                mr: 2,
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }} />
              <Typography 
                variant="body1"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                DTDrugs@gmail.com
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: { xs: 1.5, sm: 2 },
              flexWrap: 'wrap'
            }}>
              <Phone sx={{ 
                color: theme.palette.primary.main, 
                mr: 2,
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }} />
              <Typography 
                variant="body1"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                +84 944 779 743
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <LocationOn sx={{ 
                color: theme.palette.primary.main, 
                mr: 2,
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }} />
              <Typography 
                variant="body1"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                Ninh Kiều, Cần Thơ
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Biểu mẫu liên hệ */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 3,
              background: '#fff',
              color: '#000',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.primary.main, 
                mb: { xs: 1.5, sm: 2 }, 
                textAlign: 'center',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
              }}
            >
              Gửi Tin Nhắn
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Họ và Tên"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Số Điện Thoại"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Chủ Đề"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
              <TextField
                label="Tin Nhắn"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={isMobile ? 3 : 4}
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  mt: { xs: 1.5, sm: 2 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontWeight: 'bold',
                  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                  minHeight: { xs: '44px', sm: '48px' } // Touch target size
                }}
              >
                {loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            fontSize: { xs: '0.8rem', sm: '0.9rem' }
          }
        }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            '& .MuiAlert-message': {
              fontSize: { xs: '0.8rem', sm: '0.9rem' }
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;