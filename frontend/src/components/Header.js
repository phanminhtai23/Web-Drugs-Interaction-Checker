import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@mui/material';
import '../styles/Header.css'; // Import Header styles
import logo from '../assets/logo_DTdrug.png'; // Import logo

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#002447FF', boxShadow: 'none' }}>
      <Toolbar className="container" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src={logo}
            alt="Logo Kiểm Tra Tương Tác Thuốc"
            style={{
              height: '200px', // Tăng kích thước logo
              marginRight: '10px', // Khoảng cách giữa logo và navigation
            }}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link to="/" className="header-link">
            Trang chủ
          </Link>
          <Link to="/interactions" className="header-link">
            Kiểm tra tương tác
          </Link>
          <Link to="/drugs" className="header-link">
            Danh sách thuốc
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="header-link">
                Hồ sơ
              </Link>
              <button onClick={onLogout} className="header-link">
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-link">
                Đăng nhập
              </Link>
              <Link to="/register" className="header-link">
                Đăng ký
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;