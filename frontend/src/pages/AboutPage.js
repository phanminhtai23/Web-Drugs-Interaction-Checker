import React from 'react';
import { Box, Typography, Grid, Card, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Info, Support, VerifiedUser } from '@mui/icons-material';

const AboutPage = () => {
  return (
    <Box sx={{ 
      backgroundColor: '#f9f9f9', 
      py: { xs: 2, sm: 4, md: 6 }, 
      px: { xs: 1, sm: 2, md: 3 },
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 3, sm: 5, md: 8 },
          px: { xs: 2, sm: 3, md: 3 },
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          color: '#fff',
          borderRadius: { xs: 3, md: 4 },
          boxShadow: { 
            xs: '0px 4px 12px rgba(0, 0, 0, 0.15)', 
            md: '0px 8px 20px rgba(0, 0, 0, 0.2)' 
          },
          mb: { xs: 3, sm: 4, md: 6 },
          mx: { xs: 0.5, sm: 0 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'inherit',
            zIndex: 0,
          }
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            mb: { xs: 1.5, md: 2 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
            lineHeight: { xs: 1.2, md: 1.1 },
            position: 'relative',
            zIndex: 1,
            textShadow: { xs: '0 1px 3px rgba(0,0,0,0.3)', md: 'none' }
          }}
        >
          Giới Thiệu Về Công Cụ Kiểm Tra Tương Tác Thuốc
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            maxWidth: { xs: '100%', sm: '600px', md: '800px' }, 
            mx: 'auto', 
            lineHeight: { xs: 1.6, md: 1.8 },
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' },
            px: { xs: 0.5, sm: 1, md: 2 },
            position: 'relative',
            zIndex: 1,
            opacity: 0.95,
            fontWeight: { xs: 400, md: 300 }
          }}
        >
          DTDrugs là nguồn thông tin đáng tin cậy của bạn về tương tác thuốc, an toàn thuốc và các tài nguyên y tế. Sứ mệnh của chúng tôi là cung cấp kiến thức để bạn đưa ra các quyết định sáng suốt về sức khỏe của mình.
        </Typography>
      </Box>

      {/* Our Mission Section */}
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        mb: { xs: 3, sm: 4, md: 6 }, 
        px: { xs: 1, sm: 2, md: 1 } 
      }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.5px', sm: '1px', md: '2px' },
            mb: { xs: 2, sm: 3, md: 4 },
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem', lg: '2.125rem' },
          }}
        >
          Sứ Mệnh Của Chúng Tôi
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: { xs: '100%', sm: '700px', md: '800px' },
            mx: 'auto',
            textAlign: 'center',
            lineHeight: { xs: 1.6, md: 1.8 },
            color: 'text.secondary',
            mb: { xs: 2, sm: 3, md: 4 },
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem', lg: '1.125rem' },
            px: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          Tại DTDrugs, chúng tôi cung cấp thông tin đáng tin cậy, cập nhật và toàn diện về tương tác thuốc để đảm bảo an toàn và sức khỏe cho người dùng. Chúng tôi tin tưởng vào việc trao quyền cho mọi người với các công cụ và kiến thức cần thiết để đưa ra quyết định sáng suốt về sức khỏe.
        </Typography>
        <Divider sx={{ 
          my: { xs: 2, sm: 3, md: 4 },
          mx: { xs: 2, sm: 4, md: 8 },
          borderColor: '#1976d2',
          opacity: 0.3
        }} />
      </Box>

      {/* Core Values Section */}
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        mb: { xs: 3, sm: 4, md: 6 }, 
        px: { xs: 1, sm: 2, md: 1 } 
      }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.5px', sm: '1px', md: '2px' },
            mb: { xs: 2.5, sm: 3, md: 4 },
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem', lg: '2.125rem' },
          }}
        >
          Giá Trị Cốt Lõi
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3, lg: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                p: { xs: 2, sm: 2.5, md: 3 },
                boxShadow: { 
                  xs: '0px 2px 8px rgba(0, 0, 0, 0.08)', 
                  md: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
                },
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: '180px', sm: '200px', md: '220px' },
                borderRadius: { xs: 2, md: 3 },
                border: { xs: '1px solid rgba(25, 118, 210, 0.1)', md: 'none' },
                '&:hover': {
                  transform: { xs: 'translateY(-2px)', md: 'scale(1.03)' },
                  boxShadow: { 
                    xs: '0px 4px 12px rgba(0, 0, 0, 0.12)', 
                    md: '0px 6px 15px rgba(0, 0, 0, 0.2)' 
                  },
                  borderColor: { xs: '#1976d2', md: 'transparent' },
                },
              }}
            >
              <Info sx={{ 
                fontSize: { xs: 40, sm: 50, md: 60 }, 
                color: '#1976d2', 
                mb: { xs: 1, sm: 1.5, md: 2 } 
              }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: { xs: 0.5, md: 1 },
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  color: '#1976d2'
                }}
              >
                Chính Xác
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ 
                  fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' },
                  lineHeight: { xs: 1.4, md: 1.5 },
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                Chúng tôi đảm bảo rằng tất cả thông tin đều chính xác.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                p: { xs: 2, sm: 2.5, md: 3 },
                boxShadow: { 
                  xs: '0px 2px 8px rgba(0, 0, 0, 0.08)', 
                  md: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
                },
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: '180px', sm: '200px', md: '220px' },
                borderRadius: { xs: 2, md: 3 },
                border: { xs: '1px solid rgba(25, 118, 210, 0.1)', md: 'none' },
                '&:hover': {
                  transform: { xs: 'translateY(-2px)', md: 'scale(1.03)' },
                  boxShadow: { 
                    xs: '0px 4px 12px rgba(0, 0, 0, 0.12)', 
                    md: '0px 6px 15px rgba(0, 0, 0, 0.2)' 
                  },
                  borderColor: { xs: '#1976d2', md: 'transparent' },
                },
              }}
            >
              <Support sx={{ 
                fontSize: { xs: 40, sm: 50, md: 60 }, 
                color: '#1976d2', 
                mb: { xs: 1, sm: 1.5, md: 2 } 
              }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: { xs: 0.5, md: 1 },
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  color: '#1976d2'
                }}
              >
                Hỗ Trợ
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ 
                  fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' },
                  lineHeight: { xs: 1.4, md: 1.5 },
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                Đội ngũ của chúng tôi cam kết cung cấp sự hỗ trợ tuyệt vời cho người dùng.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                p: { xs: 2, sm: 2.5, md: 3 },
                boxShadow: { 
                  xs: '0px 2px 8px rgba(0, 0, 0, 0.08)', 
                  md: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
                },
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: '180px', sm: '200px', md: '220px' },
                borderRadius: { xs: 2, md: 3 },
                border: { xs: '1px solid rgba(25, 118, 210, 0.1)', md: 'none' },
                '&:hover': {
                  transform: { xs: 'translateY(-2px)', md: 'scale(1.03)' },
                  boxShadow: { 
                    xs: '0px 4px 12px rgba(0, 0, 0, 0.12)', 
                    md: '0px 6px 15px rgba(0, 0, 0, 0.2)' 
                  },
                  borderColor: { xs: '#1976d2', md: 'transparent' },
                },
              }}
            >
              <VerifiedUser sx={{ 
                fontSize: { xs: 40, sm: 50, md: 60 }, 
                color: '#1976d2', 
                mb: { xs: 1, sm: 1.5, md: 2 } 
              }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: { xs: 0.5, md: 1 },
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  color: '#1976d2'
                }}
              >
                Tin Cậy
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ 
                  fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' },
                  lineHeight: { xs: 1.4, md: 1.5 },
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
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
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 3 },
          background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
          color: '#fff',
          borderRadius: { xs: 3, md: 4 },
          boxShadow: { 
            xs: '0px 4px 12px rgba(0, 0, 0, 0.15)', 
            md: '0px 8px 20px rgba(0, 0, 0, 0.2)' 
          },
          mx: { xs: 0.5, sm: 0 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'inherit',
            zIndex: 0,
          }
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            mb: { xs: 1.5, md: 2 },
            fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem', lg: '2.125rem' },
            lineHeight: { xs: 1.2, md: 1.1 },
            position: 'relative',
            zIndex: 1,
            textShadow: { xs: '0 1px 3px rgba(0,0,0,0.3)', md: 'none' }
          }}
        >
          Tham Gia Cùng Chúng Tôi Để Thúc Đẩy Sử Dụng Thuốc An Toàn
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: { xs: '100%', sm: '600px', md: '800px' }, 
            mx: 'auto', 
            mb: { xs: 2.5, sm: 3, md: 4 }, 
            lineHeight: { xs: 1.6, md: 1.8 },
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem', lg: '1.125rem' },
            px: { xs: 0.5, sm: 1, md: 2 },
            position: 'relative',
            zIndex: 1,
            opacity: 0.95
          }}
        >
          Dù bạn là chuyên gia y tế hay bệnh nhân, DTDrugs luôn sẵn sàng hỗ trợ bạn. Khám phá các công cụ, tài nguyên và dịch vụ của chúng tôi để đảm bảo sử dụng thuốc an toàn và hiệu quả.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/register"
          sx={{
            px: { xs: 3, sm: 4, md: 4 },
            py: { xs: 1.2, sm: 1.5, md: 2 },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: { xs: 3, md: 4 },
            fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem' },
            background: 'linear-gradient(90deg, #ff9800, #ffc107)',
            minWidth: { xs: '180px', sm: '200px' },
            position: 'relative',
            zIndex: 1,
            boxShadow: { 
              xs: '0 2px 8px rgba(0,0,0,0.2)', 
              md: '0 4px 12px rgba(0,0,0,0.15)' 
            },
            '&:hover': {
              background: 'linear-gradient(90deg, #f57c00, #ffa000)',
              transform: { xs: 'translateY(-1px)', md: 'translateY(-2px)' },
              boxShadow: { 
                xs: '0 4px 12px rgba(0,0,0,0.25)', 
                md: '0 6px 16px rgba(0,0,0,0.2)' 
              },
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
