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
    <Box sx={{ backgroundColor: '#f8f8f8', py: 6, borderTop: '1px solid #ddd' }}>
      <Box className="container" sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Logo Section */}
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <img src={logoDTDrugs} alt="DTDrugs Logo" style={{ height: '80px' }} />
            </Box>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              {/* About Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                  Giới thiệu
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Link href="/about" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', '&:hover': { color: '#000000FF' } }}>
                    Về DTDrugs
                  </Link>
                  <Link href="/advertising" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', '&:hover': { color: '#000000FF' } }}>
                    Chính sách quảng cáo
                  </Link>
                  <Link href="/attribution" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', '&:hover': { color: '#000000FF' } }}>
                    Nguồn và trích dẫn
                  </Link>
                </Box>
              </Grid>

              {/* Terms Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                  Điều khoản & quyền riêng tư
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="/terms" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', '&:hover': { color: '#000000FF' } }}>
                    Điều khoản sử dụng
                  </Link>
                  <Link href="/editorial" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', '&:hover': { color: '#000000FF' } }}>
                    Chính sách biên tập
                  </Link>
                  <Link href="/privacy" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', '&:hover': { color: '#000000FF' } }}>
                    Chính sách bảo mật
                  </Link>
                </Box>
              </Grid>

              {/* Support Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                  Hỗ trợ
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="/contact" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', '&:hover': { color: '#000000FF' } }}>
                    Liên hệ
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: 2 }}>
              <Link href="mailto:info@drugs.com" color="inherit">
                <Email sx={{ fontSize: '1.5rem', color: '#1E1E1EFF' }} />
              </Link>
              <Link href="https://www.facebook.com" color="inherit">
                <Facebook sx={{ fontSize: '1.5rem', color: '#1E1E1EFF' }} />
              </Link>
              <Link href="https://www.twitter.com" color="inherit">
                <Twitter sx={{ fontSize: '1.5rem', color: '#1E1E1EFF' }} />
              </Link>
              <Link href="https://www.instagram.com" color="inherit">
                <Instagram sx={{ fontSize: '1.5rem', color: '#1E1E1EFF' }} />
              </Link>
              <Link href="https://www.youtube.com" color="inherit">
                <YouTube sx={{ fontSize: '1.5rem', color: '#1E1E1EFF' }} />
              </Link>
              <Link href="https://www.pinterest.com" color="inherit">
                <Pinterest sx={{ fontSize: '1.5rem', color: '#1E1E1EFF' }} />
              </Link>
            </Box>

            {/* Newsletter Section */}
            <Box sx={{ mt: 1, textAlign: 'justify' }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                <Link variant="body2" href="/register" color="textSecondary" sx={{ '&:hover': { color: '#45A4D7FF' } }}>
                  Đăng ký
                </Link>{' '}
                để cập nhật tin tức về thuốc và các quyền lợi DTDrugs.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ textAlign: 'justify', mt: 4 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            DTDrugs cung cấp thông tin chính xác và độc lập về hơn 9.287 loại thuốc kê đơn, thuốc không kê đơn và các sản phẩm tự nhiên. Thông tin này chỉ mang tính chất giáo dục và không nhằm mục đích tư vấn y tế, chẩn đoán hoặc điều trị.
          </Typography>
        </Box>

        {/* Footer Bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          {/* Logos Section */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <img src={sealLogo} alt="Seal Logo" style={{ height: '40px' }} />
            <img src={CTULogo} alt="Tag Verified Logo" style={{ height: '50px' }} />
            <img src={CICTLogo} alt="AdChoices Logo" style={{ height: '50px' }} />
          </Box>

          {/* Copyright Section */}
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.8rem' }}>
            Bản quyền © 2025 DTDrugs. Mọi quyền được bảo lưu.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;