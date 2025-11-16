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

// Lấy tất cả tương tác theo tên hoạt chất
export const getInteractionsByActiveIngredient = async (ingredientName) => {
  const response = await API.get(`/interactions/by-active-ingredient?ingredientName=${encodeURIComponent(ingredientName)}`);
  return response.data;
};