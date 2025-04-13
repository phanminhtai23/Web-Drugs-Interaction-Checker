import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, InputAdornment, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getDrugs } from '../services/drugService'; // Hàm lấy danh sách thuốc

const SearchBarWithSuggestions = () => {
  const [options, setOptions] = useState([]); // Danh sách gợi ý
  const [allDrugs, setAllDrugs] = useState([]); // Toàn bộ danh sách thuốc
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Tải danh sách thuốc khi component được render
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await getDrugs(1, 5000); // Lấy tối đa 1000 thuốc
        setAllDrugs(response.drugs.map((drug) => drug.tenThuoc)); // Lưu danh sách tên thuốc
      } catch (error) {
        console.error('Lỗi khi tải danh sách thuốc:', error);
      }
    };
    fetchDrugs();
  }, []);

  // Xử lý khi người dùng nhập ký tự
  const handleInputChange = (event, value) => {
    if (typeof value === 'string') {
      setQuery(value);

      if (value.trim()) {
        // Lọc danh sách thuốc dựa trên từ khóa
        const filtered = allDrugs.filter((drug) =>
          drug.toLowerCase().includes(value.toLowerCase())
        );
        setOptions(filtered.slice(0, 10)); // Giới hạn 10 kết quả
      } else {
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (event, value) => {
    if (value) {
      navigate(`/drugs/${value}`); // Điều hướng đến trang thông tin thuốc
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/drugs/${query.trim()}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          justifyContent: 'center',
          width: '100%',
          maxWidth: 600,
        }}
      >
        <Autocomplete
          freeSolo
          options={options}
          onInputChange={handleInputChange}
          onChange={handleSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tìm kiếm thuốc"
              variant="outlined"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default SearchBarWithSuggestions;