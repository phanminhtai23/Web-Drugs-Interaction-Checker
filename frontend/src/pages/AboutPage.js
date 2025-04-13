import React from 'react';
import { Box, Typography, Grid, Card, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Info, Support, VerifiedUser } from '@mui/icons-material';

const AboutPage = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: 6, px: 3 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 3,
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          color: '#fff',
          borderRadius: 3,
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          mb: 6,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Giới Thiệu Về Công Cụ Kiểm Tra Tương Tác Thuốc
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.8 }}>
          DTDrugs là nguồn thông tin đáng tin cậy của bạn về tương tác thuốc, an toàn thuốc và các tài nguyên y tế. Sứ mệnh của chúng tôi là cung cấp kiến thức để bạn đưa ra các quyết định sáng suốt về sức khỏe của mình.
        </Typography>
      </Box>

      {/* Our Mission Section */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            mb: 4,
          }}
        >
          Sứ Mệnh Của Chúng Tôi
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            textAlign: 'center',
            lineHeight: 1.8,
            color: 'text.secondary',
            mb: 4,
          }}
        >
          Tại DTDrugs, chúng tôi cung cấp thông tin đáng tin cậy, cập nhật và toàn diện về tương tác thuốc để đảm bảo an toàn và sức khỏe cho người dùng. Chúng tôi tin tưởng vào việc trao quyền cho mọi người với các công cụ và kiến thức cần thiết để đưa ra quyết định sáng suốt về sức khỏe.
        </Typography>
        <Divider sx={{ my: 4 }} />
      </Box>

      {/* Core Values Section */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            mb: 4,
          }}
        >
          Giá Trị Cốt Lõi
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                p: 3,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Info sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Chính Xác
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Chúng tôi đảm bảo rằng tất cả thông tin đều chính xác.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                p: 3,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Support sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Hỗ Trợ
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Đội ngũ của chúng tôi cam kết cung cấp sự hỗ trợ tuyệt vời cho người dùng.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                p: 3,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <VerifiedUser sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Tin Cậy
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Chúng tôi cam kết trở thành nguồn thông tin đáng tin cậy về tương tác thuốc.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          px: 3,
          background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
          color: '#fff',
          borderRadius: 3,
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Tham Gia Cùng Chúng Tôi Để Thúc Đẩy Sử Dụng Thuốc An Toàn
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mb: 4, lineHeight: 1.8 }}>
          Dù bạn là chuyên gia y tế hay bệnh nhân, DTDrugs luôn sẵn sàng hỗ trợ bạn. Khám phá các công cụ, tài nguyên và dịch vụ của chúng tôi để đảm bảo sử dụng thuốc an toàn và hiệu quả.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/register"
          sx={{
            px: 4,
            py: 2,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: 3,
            background: 'linear-gradient(90deg, #ff9800, #ffc107)',
            '&:hover': {
              background: 'linear-gradient(90deg, #f57c00, #ffa000)',
            },
          }}
        >
          Bắt Đầu Ngay
        </Button>
      </Box>
    </Box>
  );
};

export default AboutPage;
