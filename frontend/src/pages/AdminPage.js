import React, { useState } from 'react';
import { uploadFile } from '../services/adminService';
import { Typography, Box, Button, Input } from '@mui/material';

const AdminPage = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    if (!file) {
      alert('Vui lòng chọn một tệp để tải lên.');
      return;
    }

    try {
      const response = await uploadFile(file);
      alert('Tệp đã được tải lên thành công: ' + response.message);
    } catch (error) {
      console.error('Lỗi khi tải tệp lên:', error);
      alert('Không thể tải tệp lên. Vui lòng thử lại.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Bảng Quản Trị
      </Typography>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Tải Tệp Lên
      </Button>
    </Box>
  );
};

export default AdminPage;