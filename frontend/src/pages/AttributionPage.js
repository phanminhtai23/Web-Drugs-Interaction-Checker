import React from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Link,
  Card,
  CardContent,
  IconButton,
  Divider
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Home } from '@mui/icons-material';

const AttributionPage = () => {
  const dataSources = [
    {
      title: "Tổ chức Y tế Thế giới (WHO)",
      description: "Cung cấp thông tin y tế toàn cầu đáng tin cậy.",
      link: "https://www.who.int/",
    },
    {
      title: "PubMed - Thư viện Y khoa Quốc gia Hoa Kỳ",
      description: "Nền tảng nghiên cứu y khoa hàng đầu thế giới.",
      link: "https://pubmed.ncbi.nlm.nih.gov/",
    },
    {
      title: "Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ (FDA)",
      description: "Thông tin về an toàn thực phẩm và dược phẩm.",
      link: "https://www.fda.gov/",
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      },
      '@keyframes gradientShift': {
        '0%': {
          backgroundPosition: '0% 50%'
        },
        '50%': {
          backgroundPosition: '100% 50%'
        },
        '100%': {
          backgroundPosition: '0% 50%'
        }
      },
      '@keyframes pulse': {
        '0%': {
          transform: 'scale(1)',
          opacity: 1
        },
        '50%': {
          transform: 'scale(1.05)',
          opacity: 0.8
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 1
        }
      },
      '@keyframes float': {
        '0%': {
          transform: 'translateY(0px)'
        },
        '50%': {
          transform: 'translateY(-20px)'
        },
        '100%': {
          transform: 'translateY(0px)'
        }
      }
    }}>
      {/* Floating Particles */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '20px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '60%',
            right: '20%',
            width: '15px',
            height: '15px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse'
          }
        }}
      />
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.95) 0%, rgba(66, 165, 245, 0.9) 50%, rgba(100, 181, 246, 0.85) 100%)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          py: { xs: 8, sm: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.1) 0deg, transparent 60deg, rgba(255,255,255,0.1) 120deg, transparent 180deg, rgba(255,255,255,0.1) 240deg, transparent 300deg)',
            animation: 'rotate 20s linear infinite',
            pointerEvents: 'none'
          },
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0deg)'
            },
            '100%': {
              transform: 'rotate(360deg)'
            }
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                animation: 'pulse 3s ease-in-out infinite',
                background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
              }}
            >
              Nguồn và Trích dẫn
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
                opacity: 0.95,
                px: { xs: 2, sm: 0 }
              }}
            >
              Danh sách các nguồn và tài liệu tham khảo được sử dụng trong dự án
              này, đảm bảo tính chính xác và đáng tin cậy.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, md: 12 }, position: 'relative', zIndex: 2 }}>
        {/* Data Sources Section */}
        <Paper
          elevation={12}
          sx={{
            p: { xs: 4, sm: 6, md: 8 },
            mb: { xs: 6, sm: 8, md: 12 },
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 10% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 90% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)
              `,
              pointerEvents: 'none'
            }
          }}
          >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: { xs: 4, sm: 6 },
              color: '#1976d2',
              textAlign: 'center',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
          >
            Nguồn Dữ Liệu
          </Typography>          <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
            {dataSources.map((source, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.4s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(25, 118, 210, 0.2)',
                    },
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #1976d2, #42a5f5, #64b5f6, #1976d2)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s ease-in-out infinite'
                    },
                    '@keyframes shimmer': {
                      '0%': {
                        backgroundPosition: '-200% 0'
                      },
                      '100%': {
                        backgroundPosition: '200% 0'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 }, height: '100%' }}>
                    <Link
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                        height: '100%',
                        '&:hover': {
                          '& .source-title': {
                            color: '#1976d2'
                          }
                        }
                      }}
                    >
                      <Typography
                        variant="h6"
                        className="source-title"
                        sx={{
                          fontWeight: 'bold',
                          mb: 2,
                          color: '#333',
                          transition: 'color 0.3s ease',
                          fontSize: { xs: '1.1rem', sm: '1.25rem' },
                          lineHeight: 1.3
                        }}
                      >
                        {source.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.9rem', sm: '0.875rem' }
                        }}
                      >
                        {source.description}
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Citations Section */}
        <Paper
          elevation={12}
          sx={{
            p: { xs: 4, sm: 6, md: 8 },
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)
              `,
              pointerEvents: 'none'
            }
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: { xs: 4, sm: 6 },
              color: '#1976d2',
              textAlign: 'center',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
          >
            Trích Dẫn
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              lineHeight: 1.7,
              color: '#555',
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 1, sm: 0 },
              position: 'relative',
              zIndex: 1
            }}
          >
            Tất cả các thông tin và dữ liệu được sử dụng trong dự án này đều
            được trích dẫn từ các nguồn đáng tin cậy. Vui lòng tham khảo các
            liên kết trên để biết thêm chi tiết. Chúng tôi cam kết đảm bảo tính
            minh bạch và chính xác trong việc sử dụng dữ liệu.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AttributionPage;