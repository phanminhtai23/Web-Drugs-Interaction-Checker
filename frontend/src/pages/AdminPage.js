import React, { useState } from 'react';
import { uploadFile } from '../services/adminService';
import { Typography, Box, Button, Input } from '@mui/material';

const AdminPage = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const response = await uploadFile(file);
      alert('File uploaded successfully: ' + response.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Upload File
      </Button>
    </Box>
  );
};

export default AdminPage;