// Kiểm tra người dùng có phải admin không
export const isAdmin = (role) => {
  return role === 'admin';
};

// Kiểm tra người dùng có phải client không
export const isClient = (role) => {
  return role === 'client';
};

// Kiểm tra người dùng có quyền truy cập
export const hasAccess = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};