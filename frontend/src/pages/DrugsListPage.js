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
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchDrugs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getDrugs(page, 20, '', sortOrder);
        setDrugs(response.drugs);
        setFilteredDrugs(response.drugs);
        setTotalPages(response.totalPages);
      } catch (error) {
        setError('Không thể tải danh sách thuốc. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchDrugs();
  }, [page, sortOrder]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = drugs.filter((drug) =>
      drug.tenThuoc.toLowerCase().includes(query)
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

  const navigate = useNavigate();

  const handleViewDetails = (drugName) => {
    navigate(`/drugs/${drugName}`);
  };

  const handleAnimationComplete = () => {
    console.log('Hoàn thành hiệu ứng!');
  };

  return (
    <Box className="container" sx={{ mt: 5, px: 3 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          color: 'primary.main',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          textTransform: 'uppercase',
          letterSpacing: 2,
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
          placeholder="Tìm kiếm thuốc..."
          value={search}
          onChange={handleSearch}
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
          <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell
                    sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={handleSort}
                  >
                    <MedicationIcon sx={{ mr: 1 }} />
                    Tên thuốc <SortIcon sx={{ ml: 1 }} />
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phân loại</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Công ty sản xuất</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ngày phê duyệt</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Hành động
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
                    <TableCell>{drug.phanLoai || 'Không có'}</TableCell>
                    <TableCell>{drug.congTySx || 'Không có'}</TableCell>
                    <TableCell>{drug.pheDuyet || 'Không có'}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Xem chi tiết">
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => handleViewDetails(drug.tenThuoc)}
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

          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Trang {page} trên {totalPages}
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
