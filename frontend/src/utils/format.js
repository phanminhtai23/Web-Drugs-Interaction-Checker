// Định dạng ngày tháng (dd/mm/yyyy)
export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Định dạng số (thêm dấu phẩy)
export const formatNumber = (number) => {
  return number.toLocaleString();
};

// Viết hoa chữ cái đầu tiên của chuỗi
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};