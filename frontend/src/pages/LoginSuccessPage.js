import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      const user = JSON.parse(atob(token.split('.')[1])); // Giải mã payload của JWT
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/'); // Chuyển hướng đến trang chủ
    } else {
      navigate('/'); // Quay lại trang đăng nhập nếu không có token
    }
  }, [navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default LoginSuccessPage;