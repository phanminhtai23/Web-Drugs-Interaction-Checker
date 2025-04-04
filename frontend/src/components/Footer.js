import React from 'react';
import { Typography, Box, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, Pinterest, Email } from '@mui/icons-material';
import '../styles/Footer.css'; // Import Footer styles
import CTULogo from '../assets/footer/0305-logo-ctu.png';
import sealLogo from '../assets/footer/seal.svg';
import CICTLogo from '../assets/footer/CICT.jpg';
// import trustMarkLogo from '../assets/footer/trust-mark-logo.png';
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
                  About
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Link href="/about" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', color: "textSecondary" , '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    About Drugs.com
                  </Link>
                  <Link href="/advertising" underline="hover" color="textSecondary" sx={{
                    fontSize: '0.9rem', color: "textSecondary" ,
                    '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Advertising policy
                  </Link>
                  <Link href="/attribution" underline="hover" color="textSecondary" sx={{
                    fontSize: '0.9rem', color: "textSecondary" ,
                    '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Attribution & citations
                  </Link>
                </Box>
              </Grid>

              {/* Terms Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                  Terms & privacy
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="/terms" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', color: "textSecondary" , '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Terms of use
                  </Link>
                  <Link href="/editorial" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', color: "textSecondary" , '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Editorial policy
                  </Link>
                  <Link href="/privacy" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', color: "textSecondary" , '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Privacy policy
                  </Link>
                </Box>
              </Grid>

              {/* Support Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                  Support
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="/help" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', color: "textSecondary" , '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Help center
                  </Link>
                  <Link href="/sitemap" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', color: "textSecondary" , '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Sitemap
                  </Link>
                  <Link href="/contact" underline="hover" color="textSecondary" sx={{ fontSize: '0.9rem', color: "textSecondary" , '&:hover': {
                      color: '#000000FF',
                      backgroundColor: 'transparent',
                    }, }}>
                    Contact us
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
                <Link variant="body2" href="/newsletter" color="textSecondary" sx={{'&:hover': {
                      color: '#45A4D7FF',
                      backgroundColor: 'transparent',
                    },}} >Subscribe to our newsletter</Link> for the latest medication news, new drug approvals and FDA alerts.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ textAlign: 'justify', mt: 4 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Drugs.com provides accurate and independent information on more than 24,000 prescription drugs, over-the-counter medicines and natural products. This material is provided for educational purposes only and is not intended for medical advice, diagnosis or treatment. Data sources include Micromedex (updated 10 Mar 2025), Cerner Multum™ (updated 23 Mar 2025), ASHP (updated 12 Mar 2025) and others.
          </Typography>
        </Box>
        {/* Footer Bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          {/* Logos Section */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <img src={sealLogo} alt="Seal Logo" style={{ height: '40px' }} />
            <img src={CTULogo} alt="Tag Verified Logo" style={{ height: '50px' }} />
            {/* <img src={trustMarkLogo} alt="Trust Mark Logo" style={{ height: '40px' }} /> */}
            <img src={CICTLogo} alt="AdChoices Logo" style={{ height: '50px' }} />
          </Box>
        
          {/* Copyright Section */}
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.8rem' }}>
            Copyright © 2000-2025 Drugs.com. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;