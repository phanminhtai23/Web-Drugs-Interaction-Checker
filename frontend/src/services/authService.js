import API from './api';

// Đăng nhập
export const login = async (email, password, role) => {
  try {
    const response = await API.post('/auth/login', { email, password, role });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Đăng ký
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData); // Truyền toàn bộ dữ liệu người dùng
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Gửi yêu cầu quên mật khẩu
export const forgotPassword = async (email) => {
  try {
    const response = await API.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send OTP');
  }
};

// Đặt lại mật khẩu
export const resetPassword = async (email, password) => {
  try {
    const response = await API.post('/auth/reset-password', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
};

// Xác thực OTP
export const verifyOtp = async (email, otp) => {
  const response = await API.post('/auth/verify-otp', { email, otp });
  return response.data;
};