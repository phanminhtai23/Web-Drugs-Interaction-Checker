import API from './api';

// // Lấy danh sách thuốc (phân trang)
// export const getDrugs = async (page = 1, limit = 10) => {
//   const response = await API.get(`/drugs?page=${page}&limit=${limit}`);
//   return response.data;
// };

// export const getDrugs = async (page = 1, limit = 10, search = '', sortOrder = 'asc') => {
//   const response = await API.get(`/drugs?page=${page}&limit=${limit}&search=${search}&sortOrder=${sortOrder}`);
//   return response.data;
// };

// Lấy thông tin chi tiết của một thuốc
export const getDrugDetails = async (tenThuoc) => {
  const response = await API.get(`/drugs/${tenThuoc}`);
  return response.data;
};

export const searchDrugs = async (query) => {
  const response = await API.get(`/drugs/search?q=${query}`);
  return response.data;
};

export const getDrugs = async (page = 1, limit = 10000) => {
  const response = await API.get(`/drugs?page=${page}&limit=${limit}`);
  return response.data;
};
