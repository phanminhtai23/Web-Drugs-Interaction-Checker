import React, { useState } from 'react';
import { TextField, Button, Alert, Typography, Box } from '@mui/material';
import { forgotPassword } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Thêm icon

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      setLoading(true);
      await forgotPassword(email);
      setMessage('Mã OTP đã được gửi đến email của bạn.');
      navigate('/verify-otp', { state: { email } }); // Điều hướng đến trang xác thực OTP
    } catch (err) {
      setError(err.message || 'Không thể gửi mã OTP');
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
        <MailOutlineIcon sx={{ fontSize: 40, color: '#1976d2' }} />
      </Box>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}
      >
        Quên mật khẩu
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ mb: 3, color: 'gray', fontStyle: 'italic' }}
      >
        Nhập email của bạn để nhận mã OTP.
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
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiInputBase-root': { borderRadius: 2 },
        }}
        helperText="Vui lòng nhập email hợp lệ."
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
        {loading ? 'Đang gửi...' : 'Gửi mã OTP'}
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;