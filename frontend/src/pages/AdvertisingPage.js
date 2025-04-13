import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const AdvertisingPage = () => {
  return (
    <Box sx={{ py: 6, px: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 4 }}>
          Chính Sách Quảng Cáo
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 6, lineHeight: 1.8 }}>
          Chúng tôi cung cấp các dịch vụ quảng cáo nhằm hỗ trợ người dùng tiếp cận thông tin về thuốc và sức khỏe một cách hiệu quả. 
          Chính sách quảng cáo của chúng tôi đảm bảo tính minh bạch, công bằng và không ảnh hưởng đến nội dung biên tập.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                Đối Tượng Quảng Cáo
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
                Chúng tôi chấp nhận quảng cáo từ các tổ chức y tế, nhà sản xuất thuốc và các doanh nghiệp liên quan đến sức khỏe.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                Quy Định Quảng Cáo
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
                Nội dung quảng cáo phải tuân thủ các quy định pháp luật và không gây hiểu lầm cho người dùng.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
            Liên Hệ Quảng Cáo
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
            Nếu bạn quan tâm đến việc quảng cáo trên nền tảng của chúng tôi, vui lòng liên hệ qua email: <strong>DTDrugs@gmail.com</strong>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdvertisingPage;