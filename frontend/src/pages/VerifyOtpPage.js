import React, { useState } from 'react';
import { TextField, Button, Alert, Typography, Box } from '@mui/material';
import { verifyOtp } from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // Thêm icon

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Lấy email từ state của router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      setLoading(true);
      await verifyOtp(email, otp);
      setMessage('OTP đã được xác thực thành công.');
      navigate('/reset-password', { state: { email } }); // Điều hướng đến trang đặt lại mật khẩu
    } catch (err) {
      setError(err.message || 'Không thể xác thực OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 4,
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <VpnKeyIcon sx={{ fontSize: 40, color: '#1976d2' }} />
      </Box>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}
      >
        Xác thực OTP
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ mb: 3, color: 'gray', fontStyle: 'italic' }}
      >
        Email: <strong>{email}</strong>
      </Typography>
      {message && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Nhập mã OTP"
        type="text"
        fullWidth
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiInputBase-root': { borderRadius: 2 },
        }}
        helperText="Mã OTP đã được gửi đến email của bạn."
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: 3,
          background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
          '&:hover': { background: 'linear-gradient(90deg, #42a5f5, #1976d2)' },
        }}
      >
        {loading ? 'Đang xác thực...' : 'Xác thực OTP'}
      </Button>
    </Box>
  );
};

export default VerifyOtpPage;