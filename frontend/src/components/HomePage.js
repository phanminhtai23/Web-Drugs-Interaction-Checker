import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box className="container" sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Drug Interaction Checker
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Tra cứu tương tác thuốc và thông tin thuốc một cách dễ dàng và nhanh chóng.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/interactions"
        sx={{ mt: 3 }}
      >
        Start Checking Interactions
      </Button>
    </Box>
  );
};

export default HomePage;