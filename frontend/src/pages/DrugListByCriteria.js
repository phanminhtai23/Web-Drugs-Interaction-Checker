import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  Card,
  CardContent,
  IconButton,
  Divider,
  Chip,
  Container
} from '@mui/material';
import { 
  ArrowBack, 
  Medication, 
  ChevronRight,
  LocalPharmacy
} from '@mui/icons-material';

const DrugListByCriteria = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { drugs, field, value } = location.state || {};

  if (!drugs) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 3,
            background: 'linear-gradient(145deg, #f5f5f5 0%, #ffffff 100%)'
          }}
        >
          <LocalPharmacy 
            sx={{ 
              fontSize: { xs: 48, sm: 64 }, 
              color: 'grey.400', 
              mb: 2 
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Không có dữ liệu để hiển thị.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            mb: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Back Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  color: 'white',
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Quay lại
              </Typography>
            </Box>

            {/* Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Medication sx={{ mr: 2, fontSize: { xs: 32, sm: 40 } }} />
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Danh Sách Thuốc
                </Typography>
                <Chip
                  label={`${field}: ${value}`}
                  sx={{
                    mt: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                />
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Tìm thấy {drugs.length} thuốc phù hợp với tiêu chí tìm kiếm
            </Typography>
          </Box>
        </Paper>

        {/* Drugs List */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <List sx={{ p: 0 }}>
            {drugs.map((drug, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => navigate(`/drugs/${drug.tenThuoc}`)}
                  sx={{
                    py: { xs: 2, sm: 2.5 },
                    px: { xs: 2, sm: 3, md: 4 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      transform: 'translateX(8px)',
                      '& .drug-icon': {
                        color: '#667eea',
                        transform: 'scale(1.1)'
                      },
                      '& .chevron-icon': {
                        transform: 'translateX(4px)',
                        color: '#667eea'
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <LocalPharmacy
                      className="drug-icon"
                      sx={{
                        mr: { xs: 2, sm: 3 },
                        color: 'primary.main',
                        fontSize: { xs: 24, sm: 28 },
                        transition: 'all 0.3s ease'
                      }}
                    />
                    
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'medium',
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                            color: 'text.primary',
                            lineHeight: 1.3
                          }}
                        >
                          {drug.tenThuoc}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            mt: 0.5
                          }}
                        >
                          Nhấn để xem chi tiết
                        </Typography>
                      }
                    />

                    <ChevronRight
                      className="chevron-icon"
                      sx={{
                        color: 'grey.400',
                        fontSize: { xs: 24, sm: 28 },
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>
                </ListItem>
                
                {index < drugs.length - 1 && (
                  <Divider
                    sx={{
                      mx: { xs: 2, sm: 3, md: 4 },
                      opacity: 0.3
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Footer Info */}
        <Box
          sx={{
            mt: { xs: 3, sm: 4 },
            textAlign: 'center'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            Tổng cộng: {drugs.length} thuốc được tìm thấy
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DrugListByCriteria;