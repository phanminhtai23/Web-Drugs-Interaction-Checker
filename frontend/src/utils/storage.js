// Lưu dữ liệu vào localStorage
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    // Attempt to parse JSON if it's a JSON string
    return JSON.parse(value);
  } catch {
    // If parsing fails, return the raw value (e.g., for JWT tokens)
    return value;
  }
};

// Xóa dữ liệu khỏi localStorage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};