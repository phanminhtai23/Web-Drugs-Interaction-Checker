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