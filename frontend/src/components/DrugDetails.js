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
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  
  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const response = await axios.get(`/drugs/${tenThuoc}`);
        setDrug(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết thuốc:', error);
      }
    };
    fetchDrug();
  }, [tenThuoc]);

  if (!drug)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <Card
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 4,
            textAlign: 'center',
            background: 'linear-gradient(to right, #f9f9f9, #ffffff)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 2,
            }}
          >
            Không có thông tin về thuốc này
          </Typography>
          <Typography variant="body1" sx={{ color: '#757575', mb: 2 }}>
            Vui lòng kiểm tra lại tên thuốc hoặc thử tìm kiếm một loại thuốc khác.
          </Typography>
        </Card>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)} // Quay lại trang trước
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: 4,
          }}
        >
          Quay lại
        </Button>
      </Box>
    );
  
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
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          {drug.tenThuoc}
        </Typography>

        {/* Thông tin phụ */}
        <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 1 }}>
          Số đăng ký: {drug.soDangKy || 'Không có'}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', mb: 1 }}>
          Ngày phê duyệt: {drug.pheDuyet || 'Không có'}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: '0.9rem' }}>
          Đợt phê duyệt: {drug.dotPheDuyet || 'Không có'}
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
                  <strong>Phân loại:</strong> {drug.phanLoai || 'Không có'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ bgcolor: '#2575fc' }}>
                  <Science />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Dạng bào chế:</strong> {drug.baoChe || 'Không có'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9800' }}>
                  <Factory />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Công ty sản xuất:</strong> {drug.congTySx || 'Không có'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#4caf50' }}>
                  <Public />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Nước sản xuất:</strong> {drug.nuocSx || 'Không có'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <Approval />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>Ngày phê duyệt:</strong> {drug.pheDuyet || 'Không có'}
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
                <strong>Số quyết định:</strong> {drug.soQuyetDinh || 'Không có'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Tá dược:</strong> {drug.taDuoc || 'Không có'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Thời gian sử dụng:</strong> {drug.tuoiTho || 'Không có'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Quy cách đóng gói:</strong> {drug.dongGoi || 'Không có'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Tiêu chuẩn:</strong> {drug.tieuChuan || 'Không có'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Nhóm thuốc:</strong> {drug.nhomThuoc || 'Không có'}
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
                label={`${hc.tenHoatChat} (${hc.nongDo || 'Không có'})`}
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