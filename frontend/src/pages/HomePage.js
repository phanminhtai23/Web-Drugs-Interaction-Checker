import React from 'react';
import { Typography, Box, Button, Card} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Medication, Search, LocalHospital, History } from '@mui/icons-material';
import Slider from 'react-slick';
import { Divider } from '@mui/material';



const HomePage = () => {
  const navigate = useNavigate();

  // Hàm kiểm tra trạng thái đăng nhập
  const handleProtectedNavigation = (path) => {
    const isLoggedIn = !!localStorage.getItem('token'); // Kiểm tra token trong localStorage
    if (isLoggedIn) {
      navigate(path); // Điều hướng đến trang yêu cầu nếu đã đăng nhập
    } else {
      navigate('/login'); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    }
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ mx: 'auto', px: 2 }}>
      {/* Phần Hero */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'url(/path-to-hero-image.jpg) no-repeat center center',
            backgroundSize: 'cover',
            opacity: 0.2,
          }}
        />
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            animation: 'fadeIn 1s ease-in-out',
          }}
        >
          Chào mừng đến với DTDrugs
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            animation: 'fadeIn 1.5s ease-in-out',
          }}
        >
          Tra cứu tương tác thuốc và thông tin thuốc một cách dễ dàng và nhanh chóng.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/interactions"
          sx={{
            px: 4,
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: 3,
            animation: 'fadeIn 2s ease-in-out',
          }}
        >
          Bắt đầu kiểm tra tương tác
        </Button>
      </Box>

      <Divider sx={{ my: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }} />

      {/* Phần Tính năng */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', py: 1, px: 4, backgroundColor: '#f9f9f9' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1976d2',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          mb: 2,
        }}
      >
        Tính năng nổi bật
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: 6,
          color: 'text.secondary',
          fontSize: '1.1rem',
          maxWidth: '800px',
          mx: 'auto',
          lineHeight: 1.8,
        }}
      >
        Khám phá các tính năng mạnh mẽ của ứng dụng của chúng tôi, giúp bạn tra cứu thông tin thuốc và tương tác thuốc một cách dễ dàng, nhanh chóng và an toàn.
      </Typography>
      <Box
        sx={{
          width: '80px',
          height: '4px',
          backgroundColor: '#1976d2',
          mx: 'auto',
          mb: 4,
          borderRadius: '2px',
        }}
      />
        <Slider
          {...settings}
          style={{
            padding: '0 20px', // Tăng khoảng cách hai bên slider
          }}
        >
          {[
            {
              icon: <Search sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />,
              title: 'Tra cứu thuốc',
              description: 'Tìm kiếm thông tin chi tiết về các loại thuốc phổ biến.',
              onClick: () => navigate('/drugs'), // Không yêu cầu đăng nhập
            },
            {
              icon: <Medication sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />,
              title: 'Kiểm tra tương tác thuốc',
              description: 'Đảm bảo an toàn khi sử dụng nhiều loại thuốc cùng lúc.',
              onClick: () => navigate('/interactions'), // Không yêu cầu đăng nhập
            },
            {
              icon: <LocalHospital sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />,
              title: 'Quản lý đơn thuốc',
              description: 'Lưu trữ và quản lý các đơn thuốc của bạn một cách dễ dàng.',
              onClick: () => handleProtectedNavigation('/prescriptions'), // Yêu cầu đăng nhập
            },
            {
              icon: <History sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />,
              title: 'Lịch sử tra cứu',
              description: 'Xem lại các tương tác thuốc đã tra cứu gần đây của bạn.',
              onClick: () => handleProtectedNavigation('/interaction-history'), // Yêu cầu đăng nhập
            },
          ].map((feature, index) => (
            <Box
              key={index}
              sx={{
                px: 0,
                py: 3,
              }}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  p: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                  borderRadius: 4,
                  background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                }}
                onClick={feature.onClick} // Gọi hàm điều hướng khi nhấn vào card
              >
                {feature.icon}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#1976d2',
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mt: 1,
                    fontSize: '1rem',
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
      <Divider sx={{ my: 4, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
    </Box>
  );
};

export default HomePage;