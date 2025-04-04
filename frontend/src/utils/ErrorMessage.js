import React from 'react';
import { Typography, Box } from '@mui/material';

const ErrorMessage = ({ message }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="body1" color="error">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;