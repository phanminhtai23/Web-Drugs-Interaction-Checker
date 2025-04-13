import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const DrugListByCriteria = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { drugs, field, value } = location.state || {};

  if (!drugs) {
    return <Typography variant="h6">Không có dữ liệu để hiển thị.</Typography>;
  }

  return (
    <Box sx={{ mx: 'auto', px: 2, maxWidth: 800 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
        Thuốc thuộc {field}: {value}
      </Typography>
      <List>
        {drugs.map((drug, index) => (
          <ListItem
            key={index}
            button
            onClick={() => navigate(`/drugs/${drug.tenThuoc}`)} // Điều hướng đến trang chi tiết thuốc
          >
            <ListItemText primary={drug.tenThuoc} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrugListByCriteria;