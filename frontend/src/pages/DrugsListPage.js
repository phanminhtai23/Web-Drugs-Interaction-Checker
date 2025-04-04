import React, { useEffect, useState } from 'react';
import { getDrugs } from '../services/drugService';
import BlurText from "../components/BlurText";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Paper,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MedicationIcon from '@mui/icons-material/Medication';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SortIcon from '@mui/icons-material/Sort';

const DrugsListPage = () => {
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]); // Danh sách thuốc đã lọc
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

  useEffect(() => {
    const fetchDrugs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getDrugs(page, 20, '', sortOrder); // Không truyền search để lấy toàn bộ dữ liệu
        setDrugs(response.drugs);
        setFilteredDrugs(response.drugs); // Gán danh sách ban đầu vào filteredDrugs
        setTotalPages(response.totalPages);
      } catch (error) {
        setError('Failed to fetch drugs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDrugs();
  }, [page, sortOrder]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase(); // Chuyển chuỗi tìm kiếm về chữ thường
    setSearch(query);
    const filtered = drugs.filter((drug) =>
      drug.tenThuoc.toLowerCase().includes(query) // So sánh không phân biệt chữ hoa chữ thường
    );
    setFilteredDrugs(filtered);
  };

  const handleSort = () => {
    const sortedDrugs = [...filteredDrugs].sort((a, b) => {
      const nameA = a.tenThuoc.trim().toLowerCase();
      const nameB = b.tenThuoc.trim().toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setFilteredDrugs(sortedDrugs);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm xử lý khi nhấn vào "View Details"
  const handleViewDetails = (drugName) => {
    navigate(`/drugs/${drugName}`); // Điều hướng đến trang chi tiết thuốc
  };

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <Box className="container" sx={{ mt: 5, px: 3 }}>
      {/* Tiêu đề trang */}
      <Typography
        variant="h3" // Tăng cỡ chữ bằng cách sử dụng variant lớn hơn
        gutterBottom
        align="center"
        sx={{
          mb: 3, // Tăng khoảng cách dưới tiêu đề
          fontWeight: 'bold',
          color: 'primary.main', // Màu xanh đậm để nổi bật
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Hiệu ứng bóng chữ
          textTransform: 'uppercase', // Chữ in hoa để tạo sự chuyên nghiệp
          // fontFamily: "'Roboto Slab', serif",
          letterSpacing: 2, // Tăng khoảng cách giữa các chữ
        }}
      >
        <BlurText
          text="Danh sách thuốc"
          color="#ffffff"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-2xl mb-8"
        />
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search for drugs..."
          value={search}
          onChange={handleSearch} // Gọi hàm handleSearch khi nhập
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'grey.600' }} />,
          }}
          sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: 'white',
            boxShadow: 2,
            borderRadius: 2,
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      ) : (
        <>
          {/* Table */}
          <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell
                    sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={handleSort} // Gọi hàm sắp xếp khi nhấn vào tiêu đề
                  >
                    <MedicationIcon sx={{ mr: 1 }} />
                    Name <SortIcon sx={{ ml: 1 }} />
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Manufacturer</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Approval Date</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDrugs.map((drug) => (
                  <TableRow
                    key={drug._id}
                    sx={{
                      '&:nth-of-type(odd)': { bgcolor: 'grey.100' },
                      '&:hover': { bgcolor: 'grey.200' },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        {drug.tenThuoc}
                      </Typography>
                    </TableCell>
                    <TableCell>{drug.phanLoai || 'N/A'}</TableCell>
                    <TableCell>{drug.congTySx || 'N/A'}</TableCell>
                    <TableCell>{drug.pheDuyet || 'N/A'}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => handleViewDetails(drug.tenThuoc)} // Gọi hàm điều hướng
                        >
                          <VisibilityIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Page {page} of {totalPages}
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DrugsListPage;