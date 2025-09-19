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
          height: { xs: '50vh', sm: '60vh' },
          px: { xs: 2, sm: 0 },
        }}
      >
        <Card
          elevation={4}
          sx={{
            padding: { xs: 3, sm: 4 },
            borderRadius: 4,
            textAlign: 'center',
            background: 'linear-gradient(to right, #f9f9f9, #ffffff)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
            mb: { xs: 2, sm: 3 },
            maxWidth: { xs: '100%', sm: '500px' },
            width: '100%',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Không có thông tin về thuốc này
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#757575', 
              mb: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: { xs: 1.4, sm: 1.5 },
            }}
          >
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
            fontSize: { xs: '0.875rem', sm: '1rem' },
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
          }}
        >
          Quay lại
        </Button>
      </Box>
    );
  
  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      mt: { xs: 2, sm: 3, md: 5 }, 
      p: { xs: 2, sm: 3 } 
    }}>
      {/* Tiêu đề */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 3, sm: 4 },
          p: { xs: 3, sm: 4 },
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
            mb: { xs: 1.5, sm: 2 },
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            lineHeight: { xs: 1.2, sm: 1.3 },
          }}
        >
          {drug.tenThuoc}
        </Typography>

        {/* Thông tin phụ */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontStyle: 'italic', 
            mb: 1,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          Số đăng ký: {drug.soDangKy || 'Không có'}
        </Typography>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontSize: { xs: '0.8rem', sm: '0.9rem' }, 
            mb: 1 
          }}
        >
          Ngày phê duyệt: {drug.pheDuyet || 'Không có'}
        </Typography>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontSize: { xs: '0.8rem', sm: '0.9rem' } 
          }}
        >
          Đợt phê duyệt: {drug.dotPheDuyet || 'Không có'}
        </Typography>
      </Box>

      {/* Thông tin cơ bản */}
      <Card
        elevation={4}
        sx={{
          mb: { xs: 4, sm: 6 },
          borderRadius: 4,
          background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: { xs: 2, sm: 3 },
              color: '#1976d2',
              textAlign: 'center',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Thông tin cơ bản
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                gap: { xs: 1.5, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                mb: { xs: 2, sm: 0 },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ 
                    bgcolor: '#6a11cb',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                  }}>
                    <Medication sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  </Avatar>
                  <Typography 
                    variant="subtitle1"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    <strong>Phân loại:</strong> {drug.phanLoai || 'Không có'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                gap: { xs: 1.5, sm: 2 }, 
                mt: { xs: 1.5, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                mb: { xs: 2, sm: 0 },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ 
                    bgcolor: '#2575fc',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                  }}>
                    <Science sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  </Avatar>
                  <Typography 
                    variant="subtitle1"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    <strong>Dạng bào chế:</strong> {drug.baoChe || 'Không có'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                gap: { xs: 1.5, sm: 2 }, 
                mt: { xs: 1.5, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ 
                    bgcolor: '#ff9800',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                  }}>
                    <Factory sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  </Avatar>
                  <Typography 
                    variant="subtitle1"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    <strong>Công ty sản xuất:</strong> {drug.congTySx || 'Không có'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                gap: { xs: 1.5, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                mb: { xs: 2, sm: 0 },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ 
                    bgcolor: '#4caf50',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                  }}>
                    <Public sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  </Avatar>
                  <Typography 
                    variant="subtitle1"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    <strong>Nước sản xuất:</strong> {drug.nuocSx || 'Không có'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                gap: { xs: 1.5, sm: 2 }, 
                mt: { xs: 1.5, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ 
                    bgcolor: '#1976d2',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                  }}>
                    <Approval sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  </Avatar>
                  <Typography 
                    variant="subtitle1"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    <strong>Ngày phê duyệt:</strong> {drug.pheDuyet || 'Không có'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Thông tin chi tiết */}
      <Card
        elevation={4}
        sx={{
          mb: { xs: 3, sm: 4 },
          borderRadius: 4,
          background: 'linear-gradient(to right, #f9f9f9, #ffffff)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: { xs: 2, sm: 3 },
              color: '#1976d2',
              textAlign: 'center',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Thông tin chi tiết
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  mb: { xs: 1.5, sm: 0 },
                }}
              >
                <strong>Số quyết định:</strong> {drug.soQuyetDinh || 'Không có'}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mt: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  mb: { xs: 1.5, sm: 0 },
                }}
              >
                <strong>Tá dược:</strong> {drug.taDuoc || 'Không có'}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mt: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                <strong>Thời gian sử dụng:</strong> {drug.tuoiTho || 'Không có'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  mb: { xs: 1.5, sm: 0 },
                }}
              >
                <strong>Quy cách đóng gói:</strong> {drug.dongGoi || 'Không có'}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mt: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  mb: { xs: 1.5, sm: 0 },
                }}
              >
                <strong>Tiêu chuẩn:</strong> {drug.tieuChuan || 'Không có'}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mt: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
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
          mb: { xs: 3, sm: 4 },
          borderRadius: 4,
          background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: { xs: 2, sm: 3 },
              color: '#1976d2',
              textAlign: 'center',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Hoạt chất
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: { xs: 1, sm: 2 },
            justifyContent: { xs: 'center', sm: 'flex-start' },
          }}>
            {drug.hoatChat.map((hc, index) => (
              <Chip
                key={index}
                label={`${hc.tenHoatChat} (${hc.nongDo || 'Không có'})`}
                color="primary"
                variant="outlined"
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                  fontWeight: 'bold',
                  height: { xs: 'auto', sm: '32px' },
                  '& .MuiChip-label': {
                    px: { xs: 1, sm: 1.5 },
                    py: { xs: 0.5, sm: 0.75 },
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DrugDetails;