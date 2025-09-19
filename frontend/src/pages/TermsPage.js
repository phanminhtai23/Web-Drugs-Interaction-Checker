import React from 'react';
import { Box, Typography, Container, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TermsPage = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: { xs: 3, sm: 4, md: 6 } }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1976d2', 
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
              lineHeight: { xs: 1.2, sm: 1.167 }, // Better line height for mobile
              px: { xs: 1, sm: 0 }, // Padding for mobile
            }}
          >
            Điều khoản sử dụng
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555', 
              lineHeight: 1.8,
              fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
              px: { xs: 1, sm: 2, md: 0 }, // Responsive padding
            }}
          >
            Vui lòng đọc kỹ các điều khoản sử dụng dưới đây trước khi sử dụng dịch vụ của chúng tôi. Việc sử dụng trang web đồng nghĩa với việc bạn đồng ý với các điều khoản này.
          </Typography>
        </Box>

        <Divider sx={{ my: { xs: 3, sm: 4 } }} />

        {/* Terms Content */}
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Responsive font size
              lineHeight: 1.3, // Better line height for mobile
            }}
          >
            1. Quyền và trách nhiệm của người dùng
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555', 
              lineHeight: 1.8, 
              mb: { xs: 2.5, sm: 3 },
              fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
              textAlign: 'justify', // Better text alignment
            }}
          >
            Người dùng có trách nhiệm cung cấp thông tin chính xác khi sử dụng dịch vụ. Việc sử dụng thông tin sai lệch có thể dẫn đến việc tài khoản bị khóa hoặc các hậu quả pháp lý.
          </Typography>

          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.3,
            }}
          >
            2. Quyền sở hữu trí tuệ
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555', 
              lineHeight: 1.8, 
              mb: { xs: 2.5, sm: 3 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: 'justify',
            }}
          >
            Tất cả nội dung trên trang web, bao gồm văn bản, hình ảnh, biểu tượng và mã nguồn, đều thuộc quyền sở hữu của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ.
          </Typography>

          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.3,
            }}
          >
            3. Hạn chế trách nhiệm
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555', 
              lineHeight: 1.8, 
              mb: { xs: 2.5, sm: 3 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: 'justify',
            }}
          >
            Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng thông tin trên trang web. Người dùng cần tham khảo ý kiến chuyên gia trước khi đưa ra quyết định.
          </Typography>

          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.3,
            }}
          >
            4. Chính sách bảo mật
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555', 
              lineHeight: 1.8, 
              mb: { xs: 2.5, sm: 3 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: 'justify',
            }}
          >
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và không chia sẻ với bên thứ ba nếu không có sự đồng ý của bạn.
          </Typography>

          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.3,
            }}
          >
            5. Các điều khoản khác
          </Typography>
          <List sx={{ pl: { xs: 1, sm: 2 } }}> {/* Responsive padding left */}
            <ListItem sx={{ py: { xs: 0.5, sm: 1 } }}> {/* Responsive padding */}
              <ListItemIcon sx={{ minWidth: { xs: 30, sm: 56 } }}> {/* Responsive icon spacing */}
                <CheckCircleIcon sx={{ 
                  color: '#1976d2',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Responsive icon size
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Chúng tôi có quyền thay đổi các điều khoản sử dụng bất kỳ lúc nào mà không cần thông báo trước." 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive text size
                    lineHeight: 1.6, // Better line height for mobile
                  }
                }}
              />
            </ListItem>
            <ListItem sx={{ py: { xs: 0.5, sm: 1 } }}>
              <ListItemIcon sx={{ minWidth: { xs: 30, sm: 56 } }}>
                <CheckCircleIcon sx={{ 
                  color: '#1976d2',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Người dùng cần thường xuyên kiểm tra các điều khoản để cập nhật thông tin mới nhất." 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.6,
                  }
                }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: { xs: 3, sm: 4 } }} />

        {/* Footer Section */}
        <Box sx={{ textAlign: 'center', mt: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#555',
              fontSize: { xs: '0.85rem', sm: '0.875rem' }, // Responsive font size
              lineHeight: 1.6, // Better line height for mobile
              px: { xs: 1, sm: 0 }, // Padding for mobile
            }}
          >
            Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua email: <strong>DTDrugs@gmail.com</strong>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsPage;