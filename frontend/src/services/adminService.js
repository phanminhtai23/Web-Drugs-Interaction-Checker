import API from './api';

// Tải lên file PDF hoặc hình ảnh
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await API.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};