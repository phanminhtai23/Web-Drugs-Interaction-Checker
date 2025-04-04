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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5, px: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #77D0DDFF, #D0F0F6FF)',
          color: '#fff',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
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
            }}
          >
            Lịch sử kiểm tra tương tác thuốc
          </Typography>
          <Divider
            sx={{
              my: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              height: 2,
              width: '50%',
              mx: 'auto',
            }}
          />
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            Xem lại các tương tác thuốc bạn đã kiểm tra trước đây.
          </Typography>
        </Box>
      </Paper>
      <Grid container spacing={3}>
        {history.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <Medication />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Thuốc kiểm tra: {item.drugs_checked.join(', ')}
                  </Typography>
                </Box>
                {item.interactions.map((interaction, i) => (
                  <Box key={i} sx={{ mt: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {interaction.drug_a} ↔ {interaction.drug_b}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Mức độ:</strong> {interaction.severity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Cảnh báo:</strong> {interaction.effect}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(item._id)}
                >
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InteractionHistoryPage;