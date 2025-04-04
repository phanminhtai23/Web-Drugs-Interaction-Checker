import API from './api';

// Lấy thông tin hồ sơ người dùng
export const getProfile = async () => {
  const response = await API.get('/profile');
  return response.data;
};

// Cập nhật hồ sơ người dùng
export const updateProfile = async (profileData) => {
  const response = await API.put('/profile', profileData); // Gửi yêu cầu PUT đến API
  return response.data; // Trả về dữ liệu từ server
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('profile_picture', file);

  const response = await API.post('/profile/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // Trả về dữ liệu từ API
};