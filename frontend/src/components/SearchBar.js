import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <TextField
        label="Tìm kiếm thuốc hoặc tương tác"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: '50%' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ ml: 2 }}
      >
        Tìm kiếm
      </Button>
    </Box>
  );
};

export default SearchBar;