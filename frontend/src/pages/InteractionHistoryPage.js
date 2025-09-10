import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import { Delete, Medication } from '@mui/icons-material';

const InteractionHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/interaction-history');
        setHistory(response.data);
      } catch (err) {
        setError('Không thể tải lịch sử kiểm tra.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch sử này?')) {
      try {
        await axios.delete(`/interaction-history/${id}`);
        setHistory((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error('Error deleting history:', err.response || err.message);
        alert(err.response?.data?.message || 'Không thể xóa lịch sử. Vui lòng thử lại.');
      }
    }
  };

  if (loading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '50vh',
      p: { xs: 2, sm: 3 },
    }}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: 'auto', mt: { xs: 2, sm: 4 } }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box sx={{ 
      maxWidth: { xs: '100%', sm: 1200 }, 
      mx: 'auto', 
      mt: { xs: 2, sm: 3, md: 5 }, 
      px: { xs: 1, sm: 2, md: 3 },
      pb: { xs: 2, sm: 3 },
    }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
          background: 'linear-gradient(135deg, #77D0DDFF, #D0F0F6FF)',
          color: '#fff',
          borderRadius: { xs: 2, sm: 3 },
          position: 'relative',
          overflow: 'hidden',
          mx: { xs: 1, sm: 0 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              lineHeight: { xs: 1.2, sm: 1.167 },
              mb: { xs: 1, sm: 2 },
            }}
          >
            Lịch sử kiểm tra tương tác thuốc
          </Typography>
          <Divider
            sx={{
              my: { xs: 1, sm: 2 },
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              height: 2,
              width: { xs: '70%', sm: '50%' },
              mx: 'auto',
            }}
          />
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
              lineHeight: 1.5,
              px: { xs: 1, sm: 0 },
            }}
          >
            Xem lại các tương tác thuốc bạn đã kiểm tra trước đây.
          </Typography>
        </Box>
      </Paper>
      
      {history.length === 0 ? (
        <Paper 
          elevation={1}
          sx={{ 
            textAlign: 'center', 
            py: { xs: 4, sm: 6 },
            px: { xs: 2, sm: 3 },
            backgroundColor: '#fafafa',
            borderRadius: { xs: 2, sm: 3 },
            border: { xs: '1px solid #e0e0e0', sm: 'none' },
            mx: { xs: 1, sm: 0 },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2,
          }}>
            <Box sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              borderRadius: '50%',
              backgroundColor: '#e3f2fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Medication sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem' },
                color: '#1976d2',
              }} />
            </Box>
            <Typography 
              variant="h6" 
              color="textSecondary"
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              Chưa có lịch sử kiểm tra nào
            </Typography>
            <Typography 
              variant="body2" 
              color="textSecondary"
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                lineHeight: 1.5,
                maxWidth: { xs: '280px', sm: '400px' },
                textAlign: 'center',
              }}
            >
              Hãy thực hiện kiểm tra tương tác thuốc để xem lịch sử tại đây.
            </Typography>
          </Box>
        </Paper>
      ) : (
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3 }}
          sx={{
            px: { xs: 1, sm: 0 },
          }}
        >
          {history.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card
              sx={{
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: { 
                  xs: '0px 2px 8px rgba(0, 0, 0, 0.08)', 
                  sm: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  md: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                },
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { 
                  transform: { xs: 'translateY(-2px)', sm: 'scale(1.02)' },
                  boxShadow: { 
                    xs: '0px 4px 12px rgba(0, 0, 0, 0.12)', 
                    sm: '0px 8px 25px rgba(0, 0, 0, 0.15)' 
                  },
                },
                border: { xs: '1px solid #e3f2fd', sm: 'none' },
              }}
            >
              <CardContent sx={{ 
                flex: 1, 
                p: { xs: 2, sm: 2.5, md: 3 },
                pb: { xs: 1, sm: 2 },
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  mb: 2,
                  gap: { xs: 1, sm: 0 },
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main', 
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 1, sm: 0 },
                    alignSelf: { xs: 'center', sm: 'flex-start' },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}>
                    <Medication sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.3,
                      textAlign: { xs: 'center', sm: 'left' },
                      wordBreak: 'break-word',
                    }}
                  >
                    Thuốc kiểm tra: {item.drugs_checked.join(', ')}
                  </Typography>
                </Box>
                <Box sx={{ 
                  maxHeight: { xs: '200px', sm: '250px' },
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '2px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '2px',
                  },
                }}>
                  {item.interactions.map((interaction, i) => (
                    <Box 
                      key={i} 
                      sx={{ 
                        mt: i === 0 ? 0 : 2,
                        p: { xs: 1.5, sm: 2 },
                        backgroundColor: { xs: '#f8f9fa', sm: 'transparent' },
                        borderRadius: { xs: 1, sm: 0 },
                        border: { xs: '1px solid #e9ecef', sm: 'none' },
                        borderLeft: { xs: 'none', sm: '3px solid #1976d2' },
                        pl: { xs: 1.5, sm: 2 },
                      }}
                    >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: '#1976d2',
                        mb: 0.5,
                      }}
                    >
                      {interaction.drug_a} ↔ {interaction.drug_b}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        mb: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      <strong>Mức độ:</strong> {interaction.severity}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        lineHeight: 1.4,
                      }}
                    >
                      <strong>Cảnh báo:</strong> {interaction.effect}
                    </Typography>
                  </Box>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ 
                justifyContent: { xs: 'center', sm: 'flex-end' },
                p: { xs: 2, sm: 2.5 },
                pt: { xs: 1, sm: 1 },
              }}>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />}
                  onClick={() => handleDelete(item._id)}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: { xs: 1.5, sm: 2 },
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'error.light',
                      color: 'white',
                    },
                  }}
                >
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default InteractionHistoryPage;