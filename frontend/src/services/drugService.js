import API from './api';

// Lấy danh sách thuốc (phân trang)
export const getDrugs = async (page = 1, limit = 20, sortOrder = 'asc') => {
  const response = await API.get(`/drugs?page=${page}&limit=${limit}&sortOrder=${sortOrder}`);
  return response.data;
};

// Tìm kiếm thuốc với thông tin đầy đủ và phân trang
export const searchDrugsWithDetails = async (query = '', page = 1, limit = 20, sortOrder = 'asc') => {
  const response = await API.get(`/drugs/search-detailed?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&sortOrder=${sortOrder}`);
  return response.data;
};

// Lấy thông tin chi tiết của một thuốc
export const getDrugDetails = async (tenThuoc) => {
  const response = await API.get(`/drugs/${tenThuoc}`);
  return response.data;
};

// Tìm kiếm tên thuốc đơn giản (để autocomplete)
export const searchDrugs = async (query) => {
  const response = await API.get(`/drugs/search?q=${query}`);
  return response.data;
};
