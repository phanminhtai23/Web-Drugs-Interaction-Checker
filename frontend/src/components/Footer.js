import React from 'react';
import { Typography, Box, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, Pinterest, Email } from '@mui/icons-material';
import '../styles/Footer.css'; // Import Footer styles
import CTULogo from '../assets/footer/0305-logo-ctu.png';
import sealLogo from '../assets/footer/seal.svg';
import CICTLogo from '../assets/footer/CICT.jpg';
import logoDTDrugs from '../assets/logo_DTdrug.png'; // Logo chính của DTDrugs

const Footer = () => {
  return (
    <Box sx={{ 
      backgroundColor: '#f8f8f8', 
      py: { xs: 3, sm: 4, md: 6 }, 
      borderTop: '1px solid #ddd',
      mt: 'auto',
    }}>
      <Box 
        className="container" 
        sx={{ 
          maxWidth: '1200px', 
          mx: 'auto', 
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={{ xs: 3, sm: 4 }} alignItems="flex-start">
          {/* Logo Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
              mb: { xs: 2, sm: 0 },
            }}>
              <img 
                src={logoDTDrugs} 
                alt="DTDrugs Logo" 
                style={{ 
                  height: window.innerWidth < 600 ? '60px' : '80px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }} 
              />
            </Box>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={{ xs: 3, sm: 2 }}>
              {/* About Section */}
              <Grid item xs={12} sm={4} md={4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: { xs: 1.5, sm: 2 }, 
                    color: '#333', 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Giới thiệu
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: { xs: 1, sm: 1.5 },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                }}>
                  <Link 
                    href="/about" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Về DTDrugs
                  </Link>
                  <Link 
                    href="/advertising" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Chính sách quảng cáo
                  </Link>
                  <Link 
                    href="/attribution" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Nguồn và trích dẫn
                  </Link>
                </Box>
              </Grid>

              {/* Terms Section */}
              <Grid item xs={12} sm={4} md={4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: { xs: 1.5, sm: 2 }, 
                    color: '#333', 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Điều khoản & quyền riêng tư
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: { xs: 1, sm: 1.5 },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                }}>
                  <Link 
                    href="/terms" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Điều khoản sử dụng
                  </Link>
                  <Link 
                    href="/editorial" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Chính sách biên tập
                  </Link>
                  <Link 
                    href="/privacy" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Chính sách bảo mật
                  </Link>
                </Box>
              </Grid>

              {/* Support Section */}
              <Grid item xs={12} sm={4} md={4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: { xs: 1.5, sm: 2 }, 
                    color: '#333', 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  Hỗ trợ
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: { xs: 1, sm: 1.5 },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                }}>
                  <Link 
                    href="/contact" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Liên hệ
                  </Link>
                  <Link 
                    href="/faq" 
                    underline="hover" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                      '&:hover': { color: '#000000FF' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Câu hỏi thường gặp
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', sm: 'flex-end' }, 
              gap: { xs: 1.5, sm: 2 },
              pt: { xs: 3, sm: 0 },
              flexWrap: 'wrap',
            }}>
              <Link 
                href="mailto:info@drugs.com" 
                color="inherit"
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { 
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Email sx={{ 
                  fontSize: { xs: '1.3rem', sm: '1.5rem' }, 
                  color: '#1E1E1EFF',
                }} />
              </Link>
              <Link 
                href="https://www.facebook.com" 
                color="inherit"
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { 
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Facebook sx={{ 
                  fontSize: { xs: '1.3rem', sm: '1.5rem' }, 
                  color: '#1E1E1EFF',
                }} />
              </Link>
              <Link 
                href="https://www.twitter.com" 
                color="inherit"
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { 
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Twitter sx={{ 
                  fontSize: { xs: '1.3rem', sm: '1.5rem' }, 
                  color: '#1E1E1EFF',
                }} />
              </Link>
              <Link 
                href="https://www.instagram.com" 
                color="inherit"
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { 
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Instagram sx={{ 
                  fontSize: { xs: '1.3rem', sm: '1.5rem' }, 
                  color: '#1E1E1EFF',
                }} />
              </Link>
              <Link 
                href="https://www.youtube.com" 
                color="inherit"
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { 
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <YouTube sx={{ 
                  fontSize: { xs: '1.3rem', sm: '1.5rem' }, 
                  color: '#1E1E1EFF',
                }} />
              </Link>
              <Link 
                href="https://www.pinterest.com" 
                color="inherit"
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { 
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Pinterest sx={{ 
                  fontSize: { xs: '1.3rem', sm: '1.5rem' }, 
                  color: '#1E1E1EFF',
                }} />
              </Link>
            </Box>

            {/* Newsletter Section */}
            <Box sx={{ 
              mt: { xs: 2, sm: 1 }, 
              textAlign: { xs: 'center', sm: 'justify' },
              px: { xs: 2, sm: 0 },
            }}>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  lineHeight: { xs: 1.4, sm: 1.43 },
                }}
              >
                <Link 
                  variant="body2" 
                  href="/register" 
                  color="textSecondary" 
                  sx={{ 
                    '&:hover': { color: '#45A4D7FF' },
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Đăng ký
                </Link>{' '}
                để cập nhật tin tức về thuốc và các quyền lợi DTDrugs.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ 
          textAlign: { xs: 'center', sm: 'justify' }, 
          mt: { xs: 3, sm: 4 },
          px: { xs: 2, sm: 0 },
        }}>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ 
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              lineHeight: { xs: 1.4, sm: 1.43 },
            }}
          >
            DTDrugs cung cấp thông tin chính xác và độc lập về hơn 9.287 loại thuốc kê đơn, thuốc không kê đơn và các sản phẩm tự nhiên. Thông tin này chỉ mang tính chất giáo dục và không nhằm mục đích tư vấn y tế, chẩn đoán hoặc điều trị.
          </Typography>
        </Box>

        {/* Footer Bottom */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', sm: 'center' }, 
          mt: { xs: 2, sm: 3 },
          gap: { xs: 2, sm: 0 },
          px: { xs: 2, sm: 0 },
        }}>
          {/* Logos Section */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, sm: 3 },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
          }}>
            <img 
              src={CTULogo} 
              alt="Tag Verified Logo" 
              style={{ 
                height: '40px',
                maxWidth: '100%',
                objectFit: 'contain',
              }} 
            />
            <img 
              src={CICTLogo} 
              alt="AdChoices Logo" 
              style={{ 
                height: '40px',
                maxWidth: '100%',
                objectFit: 'contain',
              }} 
            />
          </Box>

          {/* Copyright Section */}
          <Typography 
            variant="caption" 
            color="textSecondary" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              textAlign: { xs: 'center', sm: 'right' },
            }}
          >
            Bản quyền © 2025 DTDrugs. Mọi quyền được bảo lưu.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;