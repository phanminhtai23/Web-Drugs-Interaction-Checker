import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { TextField, Button, Typography, Box, Alert, CircularProgress, IconButton, InputAdornment, Divider, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../styles/LoginPage.css';
import { isValidEmail, isValidPassword, isNotEmpty } from '../utils/validate';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    const { full_name, email, password, confirmPassword, phone, date_of_birth, gender, address } = formData;

    if (!isNotEmpty(full_name)) {
      setError('Họ và tên không được để trống');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }
    if (!isValidPassword(password)) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (!isNotEmpty(phone)) {
      setError('Số điện thoại không được để trống');
      return;
    }
    if (!isNotEmpty(date_of_birth)) {
      setError('Ngày sinh không được để trống');
      return;
    }
    if (!isNotEmpty(gender)) {
      setError('Giới tính không được để trống');
      return;
    }
    if (!isNotEmpty(address)) {
      setError('Địa chỉ không được để trống');
      return;
    }

    try {
      setLoading(true);
      await register({
        full_name,
        email,
        password,
        phone,
        date_of_birth,
        gender,
        address,
        role: 'client',
      });
      setSuccess('Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gmail đã được sử dụng. Vui lòng sử dụng gmail khác!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        mb: 5,
        p: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#2C3237FF',
          fontFamily: 'Poppins, Arial, sans-serif',
        }}
      >
        Đăng Ký
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        align="center"
        sx={{
          color: '#6c757d',
          fontFamily: 'Roboto, Arial, sans-serif',
          display: 'block',
          mb: 2,
        }}
      >
        Tạo tài khoản mới của bạn
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField label="Họ và Tên" name="full_name" value={formData.full_name} onChange={handleChange} fullWidth margin="normal" sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
      <TextField
        label="Mật khẩu"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField label="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
      <TextField
        label="Ngày sinh"
        name="date_of_birth"
        type="date"
        value={formData.date_of_birth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Giới tính"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        select
        fullWidth
        margin="normal"
        sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
      >
        <MenuItem value="Nam">Nam</MenuItem>
        <MenuItem value="Nữ">Nữ</MenuItem>
      </TextField>
      <TextField label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" sx={{ fontFamily: 'Roboto, Arial, sans-serif', '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'Poppins, Arial, sans-serif', background: 'linear-gradient(90deg, #1976d2, #155a9c)', '&:hover': { background: 'linear-gradient(90deg, #155a9c, #1976d2)' }, borderRadius: 3, transition: 'all 0.3s ease' }}>
        {loading ? <CircularProgress size={21} color="inherit" /> : 'Đăng Ký'}
      </Button>
      <Divider sx={{ my: 3, color: '#6c757d' }}>Hoặc</Divider>
      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 2,
          fontFamily: 'Roboto, Arial, sans-serif',
          color: '#555',
        }}
      >
        Đã có tài khoản?{' '}
        <a
          href="/login"
          style={{
            color: '#1976d2',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Đăng nhập ngay
        </a>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
