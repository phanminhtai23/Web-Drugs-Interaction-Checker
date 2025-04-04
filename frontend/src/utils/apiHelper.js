// Xử lý lỗi API
export const handleApiError = (error) => {
  if (error.response) {
    // Lỗi từ server
    return error.response.data.message || 'An error occurred on the server.';
  } else if (error.request) {
    // Không nhận được phản hồi từ server
    return 'No response from the server. Please try again later.';
  } else {
    // Lỗi khác
    return error.message || 'An unknown error occurred.';
  }
};