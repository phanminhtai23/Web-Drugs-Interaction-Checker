import React from 'react';
import { Box, Typography, Container, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PrivacyPolicyPage = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: 6 }}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
            Chính sách bảo mật
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8 }}>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và đảm bảo rằng dữ liệu của bạn được xử lý một cách an toàn và minh bạch.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Policy Content */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            1. Thông tin chúng tôi thu thập
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Chúng tôi thu thập thông tin cá nhân mà bạn cung cấp, bao gồm họ tên, email, số điện thoại, địa chỉ và các thông tin khác khi bạn sử dụng dịch vụ của chúng tôi.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            2. Cách chúng tôi sử dụng thông tin
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Thông tin của bạn được sử dụng để cung cấp dịch vụ, cải thiện trải nghiệm người dùng, và gửi thông báo quan trọng liên quan đến tài khoản hoặc dịch vụ.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            3. Chia sẻ thông tin
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba, ngoại trừ khi được yêu cầu bởi pháp luật hoặc để cung cấp dịch vụ mà bạn đã đồng ý.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            4. Bảo mật thông tin
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát hoặc lạm dụng.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            5. Quyền của bạn
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText primary="Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText primary="Bạn có thể từ chối nhận thông báo tiếp thị bất kỳ lúc nào." />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Footer Section */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#555' }}>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ với chúng tôi qua email: <strong>privacy@dtdrugs.com</strong>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;