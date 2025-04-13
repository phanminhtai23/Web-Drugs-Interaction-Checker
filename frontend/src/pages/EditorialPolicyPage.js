import React from 'react';
import { Box, Typography, Container, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EditorialPolicyPage = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: 6 }}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
            Chính sách biên tập
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8 }}>
            Chính sách biên tập của chúng tôi đảm bảo rằng tất cả nội dung được xuất bản đều chính xác, minh bạch và đáng tin cậy. Vui lòng đọc kỹ các chính sách dưới đây.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Policy Content */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            1. Tiêu chuẩn nội dung
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Tất cả nội dung được xuất bản phải tuân thủ các tiêu chuẩn chất lượng cao, đảm bảo tính chính xác, minh bạch và không thiên vị.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            2. Quy trình biên tập
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Nội dung được kiểm tra kỹ lưỡng bởi đội ngũ biên tập viên trước khi xuất bản. Chúng tôi cam kết cung cấp thông tin đáng tin cậy và hữu ích cho người dùng.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            3. Độc lập biên tập
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Chúng tôi hoạt động độc lập và không chịu ảnh hưởng từ các bên thứ ba. Mọi nội dung đều được biên tập dựa trên lợi ích của người dùng.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            4. Phản hồi và chỉnh sửa
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
            Chúng tôi hoan nghênh mọi phản hồi từ người dùng. Nếu phát hiện lỗi hoặc nội dung không chính xác, vui lòng liên hệ với chúng tôi để được chỉnh sửa kịp thời.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            5. Các nguyên tắc khác
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText primary="Chúng tôi không xuất bản nội dung vi phạm pháp luật hoặc đạo đức." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText primary="Mọi nội dung quảng cáo đều được đánh dấu rõ ràng để phân biệt với nội dung biên tập." />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Footer Section */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#555' }}>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách biên tập, vui lòng liên hệ với chúng tôi qua email: <strong>editorial@dtdrugs.com</strong>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default EditorialPolicyPage;