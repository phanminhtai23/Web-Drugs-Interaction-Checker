import React from 'react';
import { Box, Typography, Container, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TermsPage = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: 6 }}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
            Điều khoản sử dụng
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8 }}>
            Vui lòng đọc kỹ các điều khoản sử dụng dưới đây trước khi sử dụng dịch vụ của chúng tôi. Việc sử dụng trang web đồng nghĩa với việc bạn đồng ý với các điều khoản này.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Terms Content */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            1. Quyền và trách nhiệm của người dùng
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Người dùng có trách nhiệm cung cấp thông tin chính xác khi sử dụng dịch vụ. Việc sử dụng thông tin sai lệch có thể dẫn đến việc tài khoản bị khóa hoặc các hậu quả pháp lý.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            2. Quyền sở hữu trí tuệ
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Tất cả nội dung trên trang web, bao gồm văn bản, hình ảnh, biểu tượng và mã nguồn, đều thuộc quyền sở hữu của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            3. Hạn chế trách nhiệm
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng thông tin trên trang web. Người dùng cần tham khảo ý kiến chuyên gia trước khi đưa ra quyết định.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            4. Chính sách bảo mật
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và không chia sẻ với bên thứ ba nếu không có sự đồng ý của bạn.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            5. Các điều khoản khác
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText primary="Chúng tôi có quyền thay đổi các điều khoản sử dụng bất kỳ lúc nào mà không cần thông báo trước." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText primary="Người dùng cần thường xuyên kiểm tra các điều khoản để cập nhật thông tin mới nhất." />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Footer Section */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#555' }}>
            Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng, vui lòng liên hệ với chúng tôi qua email: <strong>DTDrugs@gmail.com</strong>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsPage;