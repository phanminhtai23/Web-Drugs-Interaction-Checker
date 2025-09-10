import React from 'react';
import { Typography, Box, Button, Card} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Medication, Search, LocalHospital, History } from '@mui/icons-material';
import Slider from 'react-slick';
import { Divider } from '@mui/material';
import SearchBarWithSuggestions from '../components/SearchBarWithSuggestions';

// CSS cho animation
const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Thêm styles vào head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = fadeInKeyframes;
  document.head.appendChild(style);
}



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
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 960, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false, // Ẩn mũi tên trên mobile để tiết kiệm không gian
        },
      },
    ],
  };

  return (
    <Box sx={{ mx: 'auto', px: { xs: 1, sm: 2 } }}>
      {/* Phần Hero */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #7BACD4FF, #C5C8CAFF)',
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
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
            lineHeight: { xs: 1.2, sm: 1.2, md: 1.167 },
            px: { xs: 1, sm: 2 },
          }}
        >
          Chào mừng đến với DTDrugs
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: { xs: 3, sm: 4 },
            animation: 'fadeIn 1.5s ease-in-out',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            px: { xs: 2, sm: 3, md: 0 },
            lineHeight: 1.5,
          }}
        >
          Tra cứu tương tác thuốc và thông tin thuốc một cách dễ dàng và nhanh chóng.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/interactions"
          sx={{
            px: { xs: 3, sm: 4 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            fontWeight: 'bold',
            borderRadius: 3,
            animation: 'fadeIn 2s ease-in-out',
            minWidth: { xs: '200px', sm: 'auto' },
          }}
        >
          Bắt đầu kiểm tra tương tác
        </Button>
        {/* Phần Tìm kiếm */}
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: 3, sm: 4 },
            py: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 4, md: 10 },
            background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
            borderRadius: 3,
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
            mx: { xs: 1, sm: 2, md: 'auto' },
            maxWidth: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 32px)', md: '900px' },
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
              background: 'url(/path-to-light-background.jpg) no-repeat center center',
              backgroundSize: 'cover',
              opacity: 0.1,
            }}
          />
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              textTransform: 'uppercase',
              letterSpacing: { xs: '1px', sm: '2px' },
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
              px: { xs: 1, sm: 0 },
            }}
          >
            Tìm kiếm thông tin thuốc
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              maxWidth: { xs: '100%', sm: '600px', md: '700px' },
              mx: 'auto',
              lineHeight: 1.8,
              px: { xs: 1, sm: 0 },
            }}
          >
            Nhập tên thuốc để tra cứu thông tin chi tiết hoặc kiểm tra tương tác thuốc.
          </Typography>
          <SearchBarWithSuggestions />
        </Box>
      </Box>
      <Divider sx={{ my: { xs: 2, sm: 3, md: 4 }, borderColor: 'rgba(0, 0, 0, 0.1)' }} />

      {/* Phần Tính năng */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', py: { xs: 2, sm: 3, md: 1 }, px: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f9f9f9' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1976d2',
          textTransform: 'uppercase',
          letterSpacing: { xs: '1px', sm: '2px' },
          mb: 2,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
        }}
      >
        Tính năng nổi bật
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: { xs: 4, sm: 5, md: 6 },
          color: 'text.secondary',
          fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
          maxWidth: { xs: '100%', sm: '700px', md: '800px' },
          mx: 'auto',
          lineHeight: 1.8,
          px: { xs: 1, sm: 2, md: 0 },
        }}
      >
        Khám phá các tính năng mạnh mẽ của ứng dụng của chúng tôi, giúp bạn tra cứu thông tin thuốc và tương tác thuốc một cách dễ dàng, nhanh chóng và an toàn.
      </Typography>
      <Box
        sx={{
          width: { xs: '60px', sm: '70px', md: '80px' },
          height: '4px',
          backgroundColor: '#1976d2',
          mx: 'auto',
          mb: { xs: 3, sm: 3, md: 4 },
          borderRadius: '2px',
        }}
      />
        <Slider
          {...settings}
          style={{
            padding: { xs: '0 10px', sm: '0 15px', md: '0 20px' }, // Responsive padding
          }}
        >
          {[
            {
              icon: <Search sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#1976d2', mb: 2 }} />,
              title: 'Tra cứu thuốc',
              description: 'Tìm kiếm thông tin chi tiết về các loại thuốc phổ biến.',
              onClick: () => navigate('/drugs'), // Không yêu cầu đăng nhập
            },
            {
              icon: <Medication sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#1976d2', mb: 2 }} />,
              title: 'Kiểm tra tương tác thuốc',
              description: 'Đảm bảo an toàn khi sử dụng nhiều loại thuốc cùng lúc.',
              onClick: () => navigate('/interactions'), // Không yêu cầu đăng nhập
            },
            {
              icon: <LocalHospital sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#1976d2', mb: 2 }} />,
              title: 'Quản lý đơn thuốc',
              description: 'Lưu trữ và quản lý các đơn thuốc của bạn một cách dễ dàng.',
              onClick: () => handleProtectedNavigation('/prescriptions'), // Yêu cầu đăng nhập
            },
            {
              icon: <History sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#1976d2', mb: 2 }} />,
              title: 'Lịch sử tra cứu',
              description: 'Xem lại các tương tác thuốc đã tra cứu gần đây của bạn.',
              onClick: () => handleProtectedNavigation('/interaction-history'), // Yêu cầu đăng nhập
            },
          ].map((feature, index) => (
            <Box
              key={index}
              sx={{
                px: { xs: 0.5, sm: 1, md: 0 },
                py: { xs: 2, sm: 2.5, md: 3 },
              }}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  p: { xs: 2.5, sm: 3, md: 4 },
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                  borderRadius: 4,
                  background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  minHeight: { xs: '160px', sm: '180px', md: '200px' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
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
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mt: 1,
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                    lineHeight: 1.4,
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
      <Divider sx={{ my: { xs: 2, sm: 3, md: 4 }, borderColor: 'rgba(0, 0, 0, 0.1)' }} />

      {/* Câu hỏi thường gặp */}
      <Box
        sx={{
          py: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #f9f9f9, #ffffff)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1976d2', // Tiêu đề màu xanh dương phù hợp với trang web
            textTransform: 'uppercase',
            letterSpacing: { xs: '1px', sm: '2px' },
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          Câu hỏi thường gặp
        </Typography>
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: '700px', md: '800px' },
            mx: 'auto',
            textAlign: 'left',
          }}
        >
          {[
            {
              question: 'DTDrugs có miễn phí không?',
              answer: 'Có, ứng dụng DTDrugs hoàn toàn miễn phí để sử dụng.',
            },
            {
              question: 'Làm thế nào để kiểm tra tương tác thuốc?',
              answer: 'Bạn chỉ cần nhập tên các loại thuốc vào công cụ kiểm tra tương tác trên trang chủ.',
            },
            {
              question: 'Thông tin thuốc có đáng tin cậy không?',
              answer: 'Tất cả thông tin trên DTDrugs được kiểm chứng từ các nguồn y tế uy tín.',
            },
          ].map((faq, index) => (
            <Box
              key={index}
              sx={{
                mb: { xs: 2, sm: 2.5, md: 3 },
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: 2,
                background: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2', // Màu xanh dương cho câu hỏi
                  mb: 1,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                }}
              >
                {faq.question}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#555', // Màu xám nhạt cho câu trả lời
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  lineHeight: 1.5,
                }}
              >
                {faq.answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: { xs: 2, sm: 3, md: 4 }, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
      {/* Hướng dẫn sử dụng */}
      <Box
        sx={{
          py: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #f5f5f5, #ffffff)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1976d2', // Tiêu đề màu xanh dương phù hợp với trang web
            textTransform: 'uppercase',
            letterSpacing: { xs: '1px', sm: '2px' },
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          Hướng dẫn sử dụng
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: { xs: 3, sm: 3, md: 4 },
            alignItems: { xs: 'center', sm: 'stretch' },
          }}
        >
          {[
            {
              step: '1',
              title: 'Tìm kiếm thuốc',
              description: 'Nhập tên thuốc vào thanh tìm kiếm để tra cứu thông tin chi tiết.',
            },
            {
              step: '2',
              title: 'Kiểm tra tương tác',
              description: 'Chọn các loại thuốc để kiểm tra tương tác giữa chúng.',
            },
            {
              step: '3',
              title: 'Quản lý đơn thuốc',
              description: 'Lưu trữ và quản lý các đơn thuốc của bạn một cách dễ dàng.',
            },
          ].map((guide, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                maxWidth: { xs: '280px', sm: '300px', md: '300px' },
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' },
                p: { xs: 2.5, sm: 3, md: 3 },
                borderRadius: 2,
                background: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2', // Màu xanh dương cho số bước
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                }}
              >
                {guide.step}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#000', // Tiêu đề màu đen
                  mt: 2,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                }}
              >
                {guide.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#555', // Màu xám nhạt cho mô tả
                  mt: 1,
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  lineHeight: 1.5,
                }}
              >
                {guide.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: { xs: 2, sm: 3, md: 4 }, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
      {/* Thống kê nổi bật */}
      <Box
        sx={{
          py: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #ffffff, #f5f5f5)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1976d2', // Tiêu đề màu xanh dương phù hợp với trang web
            textTransform: 'uppercase',
            letterSpacing: { xs: '1px', sm: '2px' },
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          Thống kê nổi bật
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: { xs: 3, sm: 3, md: 4 },
            alignItems: { xs: 'center', sm: 'stretch' },
          }}
        >
          {[
            { label: 'Cặp tương tác thuốc', value: '20,000+' },
            { label: 'Loại thuốc', value: '9,000+' },
            { label: 'Tương tác đã kiểm tra', value: '200+' },
          ].map((stat, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                maxWidth: { xs: '200px', sm: '180px', md: '200px' },
                width: { xs: '100%', sm: 'calc(33.333% - 16px)', md: 'auto' },
                p: { xs: 2.5, sm: 3, md: 3 },
                borderRadius: 2,
                background: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2', // Màu xanh dương cho giá trị
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#555', // Màu xám nhạt cho nhãn
                  mt: 1,
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;