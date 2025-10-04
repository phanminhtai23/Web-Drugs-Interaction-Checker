import API from './api';

// Tra cứu tương tác thuốc
export const checkInteractions = async (drugNames) => {
  const response = await API.post('/interactions', { drugNames });
  return response.data;
};

// Phát hiện thuốc từ ảnh
export const detectDrugsFromImages = async (base64Images) => {
  const response = await API.post('/interactions/detect-drug', {
    Base64DocumentUrl: base64Images
  });
  return response.data;
};