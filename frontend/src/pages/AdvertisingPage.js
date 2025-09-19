import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const AdvertisingPage = () => {
  return (
    <Box sx={{ 
      py: { xs: 3, sm: 4, md: 6 }, 
      px: { xs: 2, sm: 3, md: 4 }, 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh' 
    }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#1976d2', 
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
            px: { xs: 1, sm: 0 }
          }}
        >
          Chính Sách Quảng Cáo
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#555', 
            mb: { xs: 4, sm: 5, md: 6 }, 
            lineHeight: 1.8,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            px: { xs: 1, sm: 0 },
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          Chúng tôi cung cấp các dịch vụ quảng cáo nhằm hỗ trợ người dùng tiếp cận thông tin về thuốc và sức khỏe một cách hiệu quả. 
          Chính sách quảng cáo của chúng tôi đảm bảo tính minh bạch, công bằng và không ảnh hưởng đến nội dung biên tập.
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 3, sm: 3.5, md: 4 }, 
                borderRadius: 2,
                height: { xs: 'auto', sm: '100%' },
                display: 'flex',
                flexDirection: 'column',
                boxShadow: { xs: 2, sm: 3 }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2', 
                  mb: 2,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  textAlign: 'center'
                }}
              >
                Đối Tượng Quảng Cáo
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#555', 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '0.875rem' },
                  textAlign: 'center',
                  flex: 1
                }}
              >
                Chúng tôi chấp nhận quảng cáo từ các tổ chức y tế, nhà sản xuất thuốc và các doanh nghiệp liên quan đến sức khỏe.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 3, sm: 3.5, md: 4 }, 
                borderRadius: 2,
                height: { xs: 'auto', sm: '100%' },
                display: 'flex',
                flexDirection: 'column',
                boxShadow: { xs: 2, sm: 3 }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2', 
                  mb: 2,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  textAlign: 'center'
                }}
              >
                Quy Định Quảng Cáo
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#555', 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '0.875rem' },
                  textAlign: 'center',
                  flex: 1
                }}
              >
                Nội dung quảng cáo phải tuân thủ các quy định pháp luật và không gây hiểu lầm cho người dùng.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ 
          mt: { xs: 6, sm: 7, md: 8 },
          px: { xs: 1, sm: 0 },
          pt: { xs: 4, sm: 5, md: 6 }
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1976d2', 
              mb: 3,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Liên Hệ Quảng Cáo
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#555', 
              lineHeight: 1.6,
              fontSize: { xs: '0.9rem', sm: '0.875rem' },
              textAlign: 'center',
              maxWidth: '600px',
              mx: 'auto',
              '& strong': {
                color: '#1976d2',
                fontWeight: 600
              }
            }}
          >
            Nếu bạn quan tâm đến việc quảng cáo trên nền tảng của chúng tôi, vui lòng liên hệ qua email: <strong>DTDrugs@gmail.com</strong>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdvertisingPage;