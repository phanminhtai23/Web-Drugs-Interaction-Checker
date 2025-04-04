import API from './api';

// Tra cứu tương tác thuốc
export const checkInteractions = async (drugNames) => {
  const response = await API.post('/interactions', { drugNames });
  return response.data;
};