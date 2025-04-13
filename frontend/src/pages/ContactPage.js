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
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import axios from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();

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
        py: 6,
        px: 4,
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Liên Hệ Với Chúng Tôi
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua biểu mẫu dưới đây hoặc thông tin liên hệ.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Thông tin liên hệ */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              background: '#fff',
              color: '#000',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}>
              Thông Tin Liên Hệ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ color: theme.palette.primary.main, mr: 2 }} />
              <Typography variant="body1">DTDrugs@gmail.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ color: theme.palette.primary.main, mr: 2 }} />
              <Typography variant="body1">+84 944 779 743</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ color: theme.palette.primary.main, mr: 2 }} />
              <Typography variant="body1">Ninh Kiều, Cần Thơ</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Biểu mẫu liên hệ */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              background: '#fff',
              color: '#000',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2, textAlign: 'center' }}>
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
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Số Điện Thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Chủ Đề"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tin Nhắn"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  },
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
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;