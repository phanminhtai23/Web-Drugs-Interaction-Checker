import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MedicationIcon from '@mui/icons-material/Medication';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import InfoIcon from '@mui/icons-material/Info'; // Import biểu tượng Info
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'; 

import logo from '../assets/logo_DTdrug.png'; // Import logo

const NavBar = ({ isLoggedIn, onLogout }) => {
  const role = localStorage.getItem('role'); // Lấy vai trò từ localStorage
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#ffffff', // Màu nền trắng giống drugs.com
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #ddd',
        zIndex: 1300,
      }}
    >
      <Toolbar
        className="container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
            alt="Drug Interaction Checker Logo"
            style={{
              height: '85px', // Kích thước logo
              marginRight: '20px', // Khoảng cách giữa logo và navigation
            }}
          />
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}> {/* Reduced gap for the first group */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: '#333', // Màu chữ đen
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                color: '#0073e6', // Màu xanh khi hover
                backgroundColor: 'transparent',
              },
            }}
          >
            <HomeIcon sx={{ marginRight: '8px' }} />
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/drugs"
            sx={{
              color: '#333',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                color: '#0073e6',
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListIcon sx={{ marginRight: '8px' }} />
            Drugs List
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/interactions"
            sx={{
              color: '#333',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                color: '#0073e6',
                backgroundColor: 'transparent',
              },
            }}
          >
            <MedicationIcon sx={{ marginRight: '8px' }} />
            Check Interactions
          </Button>

           {/* Nút Giới thiệu */}
            <Button
              color="inherit"
              component={Link}
              to="/about"
              sx={{
                color: '#333',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  color: '#0073e6',
                  backgroundColor: 'transparent',
                },
              }}
            >
              <InfoIcon sx={{ marginRight: '8px' }} /> {/* Thay đổi biểu tượng */}
              About
            </Button>

        </Box>

        {/* Divider between navigation groups */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', marginX: 2 }}>
          <Box sx={{ width: '1px', height: '40px', backgroundColor: '#ddd' }} />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, marginLeft: 4 }}> {/* Reduced gap for the second group and added margin */}
          {isLoggedIn ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                sx={{
                  backgroundColor: '#f5f5f5', // Light gray background
                  color: '#333', // Dark text color
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd', // Subtle border
                  '&:hover': {
                    backgroundColor: '#e0e0e0', // Slightly darker gray on hover
                    color: '#0073e6', // Blue text on hover
                  },
                }}
              >
                <PersonIcon sx={{ marginRight: '8px' }} />
                Profile
              </Button>
              {role === 'admin' && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  sx={{
                    color: '#333',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      color: '#0073e6',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <AdminPanelSettingsIcon sx={{ marginRight: '8px' }} />
                  Admin Panel
                </Button>
              )}
              <Button
                color="inherit"
                onClick={onLogout}
                sx={{
                  backgroundColor: '#f5f5f5', // Light gray background
                  color: '#333', // Dark text color
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd', // Subtle border
                  '&:hover': {
                    backgroundColor: '#e0e0e0', // Slightly darker gray on hover
                    color: '#d32f2f', // Red text on hover
                  },
                }}
              >
                <LogoutIcon sx={{ marginRight: '8px' }} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: '#FFFFFFFF', // Màu xanh giống drugs.com
                  color: '#000',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: '5px 5px',
                  borderRadius: '10px',
                  border: '1px solid #000',
                  '&:hover': {
                    backgroundColor: '#A6AAAEFF', // Màu xanh đậm hơn khi hover
                  },
                }}
              >
                <LoginIcon sx={{ marginRight: '8px' }} />
                Login
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: '#0073e6', // Màu vàng giống drugs.com
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#005bb5', // Màu vàng đậm hơn khi hover
                  },
                }}
              >
                <AppRegistrationIcon sx={{ marginRight: '8px' }} />
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
          <IconButton
            size="large"
            edge="start"
            color='default'
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              color: '#333', // Màu chữ đen
              '&:hover': {
                color: '#0073e6', // Màu xanh khi hover
              },
            }}
          >
          <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                width: '100%', // Chiều rộng menu chiếm toàn bộ màn hình
                maxWidth: '300px', // Giới hạn chiều rộng tối đa
                marginTop: '10px', // Khoảng cách từ nút menu
              },
            }}
          >
            {/* Nhóm các mục menu */}
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              <HomeIcon sx={{ marginRight: '8px' }} />
              Home
            </MenuItem>
            <MenuItem component={Link} to="/drugs-a-z" onClick={handleMenuClose}>
              <SortByAlphaIcon sx={{ marginRight: '8px' }} />
              Drugs A-Z
            </MenuItem>
            <MenuItem component={Link} to="/drugs" onClick={handleMenuClose}>
              <ListIcon sx={{ marginRight: '8px' }} />
              Drugs List
            </MenuItem>
            <MenuItem component={Link} to="/interactions" onClick={handleMenuClose}>
              <MedicationIcon sx={{ marginRight: '8px' }} />
              Check Interactions
            </MenuItem>
            <MenuItem component={Link} to="/about" onClick={handleMenuClose}>
              <InfoIcon sx={{ marginRight: '8px' }} />
              About
            </MenuItem>

            {/* Hiển thị các mục liên quan đến người dùng */}
            {isLoggedIn ? (
              <>
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                  <PersonIcon sx={{ marginRight: '8px' }} />
                  Profile
                </MenuItem>
                {role === 'admin' && (
                  <MenuItem component={Link} to="/admin" onClick={handleMenuClose}>
                    <AdminPanelSettingsIcon sx={{ marginRight: '8px' }} />
                    Admin Panel
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    onLogout();
                    handleMenuClose();
                  }}
                >
                  <LogoutIcon sx={{ marginRight: '8px' }} />
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                  <LoginIcon sx={{ marginRight: '8px' }} />
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                  <AppRegistrationIcon sx={{ marginRight: '8px' }} />
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
</Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;