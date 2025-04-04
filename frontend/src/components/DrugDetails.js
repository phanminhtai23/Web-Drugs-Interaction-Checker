import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  // Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Medication,
  Factory,
  Public,
  Science,
  Approval,
  // Inventory,
  // Assignment,
} from '@mui/icons-material';

const DrugDetails = () => {
  const { tenThuoc } = useParams();
  const [drug, setDrug] = useState(null);

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const response = await axios.get(`/drugs/${tenThuoc}`);
        setDrug(response.data);
      } catch (error) {
        console.error('Error fetching drug details:', error);
      }
    };
    fetchDrug();
  }, [tenThuoc]);

  if (!drug) return <Typography align="center">Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5, p: 3 }}>
      {/* Tiêu đề */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          color: '#fff',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Tên thuốc */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#ffffff', // Đặt màu chữ trắng để tương phản với nền
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Thêm hiệu ứng bóng chữ để nổi bật hơn
          }}
        >
          {drug.tenThuoc}
        </Typography>

        {/* Thông tin phụ */}
        <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 1 }}>
          Số đăng ký: {drug.soDangKy || 'N/A'}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', mb: 1 }}>
          Ngày phê duyệt: {drug.pheDuyet || 'N/A'}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: '0.9rem' }}>
          Đợt phê duyệt: {drug.dotPheDuyet || 'N/A'}
        </Typography>
      </Box>

      {/* Thông tin cơ bản */}
      <Card
        elevation={4}
        sx={{
          mb: 6,
          borderRadius: 4,
          background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#1976d2',
              textAlign: 'center',
            }}
          >
            Thông tin cơ bản
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#6a11cb' }}>
                  <Medication />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Phân loại:</strong> {drug.phanLoai || 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ bgcolor: '#2575fc' }}>
                  <Science />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Dạng bào chế:</strong> {drug.baoChe || 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9800' }}>
                  <Factory />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Công ty sản xuất:</strong> {drug.congTySx || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#4caf50' }}>
                  <Public />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Nước sản xuất:</strong> {drug.nuocSx || 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <Approval />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Ngày phê duyệt:</strong> {drug.pheDuyet || 'N/A'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Thông tin chi tiết */}
      <Card
        elevation={4}
        sx={{
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(to right, #f9f9f9, #ffffff)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#1976d2',
              textAlign: 'center',
            }}
          >
            Thông tin chi tiết
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Số quyết định:</strong> {drug.soQuyetDinh || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Tá dược:</strong> {drug.taDuoc || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Thời gian sử dụng:</strong> {drug.tuoiTho || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Quy cách đóng gói:</strong> {drug.dongGoi || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Tiêu chuẩn:</strong> {drug.tieuChuan || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Nhóm thuốc:</strong> {drug.nhomThuoc || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Hoạt chất */}
      <Card
        elevation={4}
        sx={{
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#1976d2',
              textAlign: 'center',
            }}
          >
            Hoạt chất
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {drug.hoatChat.map((hc, index) => (
              <Chip
                key={index}
                label={`${hc.tenHoatChat} (${hc.nongDo || 'N/A'})`}
                color="primary"
                variant="outlined"
                sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DrugDetails;