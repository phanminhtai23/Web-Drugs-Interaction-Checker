import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import { getProfile, uploadAvatar } from '../services/profileService';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { updateProfile } from '../services/profileService'; // Import hàm cập nhật hồ sơ
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    address: '',
    medical_history: [],
  });
  // const [user, setUser] = useState(null);
  
  const [newDisease, setNewDisease] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile({
          ...response,
          date_of_birth: response.date_of_birth || '',
          medical_history: response.medical_history || [],
          profile_picture: response.profile_picture || '', // Đảm bảo nhận ảnh đại diện
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await uploadAvatar(file);
        const newProfilePicture = `${process.env.REACT_APP_API_URL}${response.profile_picture}`;
        setProfile((prev) => ({ ...prev, profile_picture: newProfilePicture })); // Cập nhật ảnh đại diện
        alert('Tải lên ảnh đại diện thành công');
      } catch (error) {
        console.error('Lỗi khi tải lên ảnh đại diện:', error);
        alert('Tải lên ảnh đại diện thất bại. Vui lòng thử lại.');
      }
    }
  };
  
  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = {
        ...profile,
        date_of_birth: profile.date_of_birth || null, // Gửi null nếu ngày sinh trống
      };

      const response = await updateProfile(updatedProfile);
      alert('Cập nhật hồ sơ thành công!');
      setProfile({
        ...response,
        date_of_birth: response.date_of_birth || '', // Đảm bảo ngày sinh không bị undefined
        medical_history: response.medical_history || [], // Đảm bảo medical_history luôn là mảng
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Cập nhật hồ sơ thất bại. Vui lòng thử lại.');
    }
  };

  const handleAddCustomDisease = () => {
    const trimmedDisease = newDisease.trim();
    if (trimmedDisease && !profile.medical_history.includes(trimmedDisease)) {
      setProfile((prev) => ({
        ...prev,
        medical_history: [...prev.medical_history, trimmedDisease],
      }));
      setNewDisease(''); // Xóa nội dung trong TextField sau khi thêm
    } else {
      alert('Tên bệnh không hợp lệ hoặc đã tồn tại!');
    }
  };

  const handleRemoveDisease = (disease) => {
    setProfile((prev) => ({
      ...prev,
      medical_history: prev.medical_history.filter((item) => item !== disease),
    }));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFFFFFF, #0063B4FF)', // Gradient hiện đại
        padding: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 900,
          width: '100%',
          borderRadius: 6, // Bo góc mềm mại hơn
          overflow: 'hidden',
          boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.4)', // Hiệu ứng bóng hiện đại
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(90deg, #1976d2, #42a5f5)', // Gradient tiêu đề
            color: '#fff',
            textAlign: 'center',
            padding: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            Hồ Sơ Cá Nhân
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Quản lý và cập nhật thông tin cá nhân của bạn
          </Typography>
        </Box>
        <Box sx={{ padding: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', width: 150, height: 150, mx: 'auto' }}>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    border: '4px solid #fff',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  }}
                  src={profile.profile_picture || ''} // Hiển thị ảnh đại diện
                >
                  {!profile.profile_picture && (
                    <AccountCircleIcon sx={{ fontSize: 100, color: '#fff' }} />
                  )}
                </Avatar>
                <IconButton
                  color="primary"
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #1976d2',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      color: '#fff',
                    },
                  }}
                >
                  <PhotoCamera />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                {profile.full_name || 'Hồ sơ cá nhân'}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Cập nhật thông tin cá nhân của bạn
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box>
            <TextField
              label="Họ và tên"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Số điện thoại"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Ngày sinh"
              name="date_of_birth"
              type="date"
              value={profile.date_of_birth || ''} // Đảm bảo không bị undefined
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Giới tính"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </TextField>
            <TextField
              label="Địa chỉ"
              name="address"
              value={profile.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Tiền sử bệnh
              </Typography>
              <IconButton color="primary" onClick={handleOpenModal}>
                <AddCircleIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {profile.medical_history.map((disease, index) => (
                <Chip
                  key={index}
                  label={disease}
                  onDelete={() => handleRemoveDisease(disease)}
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                />
              ))}
            </Box>
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="add-disease-modal"
              aria-describedby="add-disease-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 450,
                  bgcolor: 'background.paper',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)', // Hiệu ứng bóng mềm mại
                  p: 4,
                  borderRadius: 3, // Bo góc mềm mại
                  background: 'linear-gradient(135deg, #ffffff, #f0f4ff)', // Gradient nền
                }}
              >
                <Typography
                  id="add-disease-modal"
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#1976d2', // Màu sắc nổi bật
                  }}
                >
                  Thêm bệnh mới
                </Typography>
                <TextField
                  label="Nhập tên bệnh"
                  variant="outlined"
                  value={newDisease}
                  onChange={(e) => setNewDisease(e.target.value)}
                  fullWidth
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2, // Bo góc mềm mại cho TextField
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCloseModal}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      color: '#1976d2',
                      borderColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#e3f2fd',
                        borderColor: '#1565c0',
                      },
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleAddCustomDisease();
                      handleCloseModal();
                    }}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      background: 'linear-gradient(90deg, #1976d2, #42a5f5)', // Gradient nút
                      '&:hover': {
                        background: 'linear-gradient(90deg, #1565c0, #1e88e5)',
                      },
                    }}
                  >
                    Thêm
                  </Button>
                </Box>
              </Box>
            </Modal>
            
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile} // Gọi hàm cập nhật hồ sơ
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: 3,
              background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
              '&:hover': {
                background: 'linear-gradient(90deg, #1565c0, #1e88e5)',
              },
            }}
          >
            Cập nhật hồ sơ
          </Button>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/prescriptions')}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 3,
                  mr: 2,
                  background: 'linear-gradient(90deg, #ff9800, #ffc107)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #f57c00, #ffa000)',
                  },
                }}
              >
                Quản lý đơn thuốc
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate('/interaction-history')}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #f44336, #e57373)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #d32f2f, #ef5350)',
                  },
                }}
              >
                Xem lịch sử
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default ProfilePage;
