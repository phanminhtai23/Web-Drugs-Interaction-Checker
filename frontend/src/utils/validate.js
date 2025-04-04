// Kiểm tra email hợp lệ
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Kiểm tra mật khẩu hợp lệ (ít nhất 6 ký tự)
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Kiểm tra chuỗi không rỗng
export const isNotEmpty = (value) => {
  return value.trim() !== '';
};