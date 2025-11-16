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
      {/* Header thiết kế mới */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        {/* Tên thuốc - Card chính */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: { xs: 2, sm: 3 },
            background: '#fff',
            border: '1px solid #e0e0e0',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #1976d2, #42a5f5, #1976d2)',
            }
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 }, pt: { xs: 4, sm: 5 } }}>
            <Box sx={{ textAlign: 'center' }}>
              {/* Icon thuốc */}
              <Avatar
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  mx: 'auto',
                  mb: 2,
                  bgcolor: '#1976d2',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                }}
              >
                <Medication sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
              </Avatar>

              {/* Tên thuốc */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                {drug.tenThuoc}
              </Typography>

              {/* Divider */}
              <Box
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: 2,
                  bgcolor: '#1976d2',
                  mx: 'auto',
                  mb: 3,
                  borderRadius: 1,
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Thông tin đăng ký - Cards nhỏ */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e8f4fd',
                bgcolor: '#f8fcff',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, textAlign: 'center' }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#666',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }}
                >
                  Số đăng ký
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#1976d2',
                    fontWeight: 600,
                    mt: 0.5,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {drug.soDangKy || 'Không có'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e8f5e8',
                bgcolor: '#f8fff8',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, textAlign: 'center' }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#666',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }}
                >
                  Ngày phê duyệt
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#2e7d32',
                    fontWeight: 600,
                    mt: 0.5,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {drug.pheDuyet || 'Không có'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #fff3e0',
                bgcolor: '#fffbf5',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, textAlign: 'center' }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#666',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' }
                  }}
                >
                  Đợt phê duyệt
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#f57c00',
                    fontWeight: 600,
                    mt: 0.5,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {drug.dotPheDuyet || 'Không có'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
                    bgcolor: '#4CAF50',
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
                    bgcolor: '#2196F3',
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
                    bgcolor: '#FF9800',
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
                    bgcolor: '#009688',
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
                    bgcolor: '#3F51B5',
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