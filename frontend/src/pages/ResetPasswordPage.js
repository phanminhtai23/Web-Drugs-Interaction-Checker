import React, { useState } from 'react';
import { TextField, Button, Alert, Typography, Box } from '@mui/material';
import { resetPassword } from '../services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset'; // Thêm icon

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email, password);
      setMessage('Mật khẩu đã được đặt lại thành công.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Không thể đặt lại mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 450,
        mx: 'auto',
        mt: 5,
        p: 4,
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <LockResetIcon sx={{ fontSize: 40, color: '#1976d2' }} />
      </Box>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}
      >
        Đặt lại mật khẩu
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
        label="Mật khẩu mới"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiInputBase-root': { borderRadius: 2 },
        }}
        helperText="Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      />
      <TextField
        label="Xác nhận mật khẩu mới"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiInputBase-root': { borderRadius: 2 },
        }}
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
        {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
      </Button>
    </Box>
  );
};

export default ResetPasswordPage;