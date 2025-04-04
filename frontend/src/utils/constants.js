// Vai trò người dùng
export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  DOCTOR: 'doctor',
  PHARMACIST: 'pharmacist',
};

// Mức độ nghiêm trọng của tương tác thuốc
export const SEVERITY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

// URL API cơ bản
export const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';