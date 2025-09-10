import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const EditorialPolicyPage = () => {
  const policyData = [
    {
      id: 'content-standards',
      title: '1. Tiêu chuẩn nội dung',
      icon: <FactCheckIcon />,
      content: 'Tất cả nội dung được xuất bản phải tuân thủ các tiêu chuẩn chất lượng cao, đảm bảo tính chính xác, minh bạch và không thiên vị.'
    },
    {
      id: 'editorial-process',
      title: '2. Quy trình biên tập',
      icon: <EditIcon />,
      content: 'Nội dung được kiểm tra kỹ lưỡng bởi đội ngũ biên tập viên trước khi xuất bản. Chúng tôi cam kết cung cấp thông tin đáng tin cậy và hữu ích cho người dùng.'
    },
    {
      id: 'editorial-independence',
      title: '3. Độc lập biên tập',
      icon: <SecurityIcon />,
      content: 'Chúng tôi hoạt động độc lập và không chịu ảnh hưởng từ các bên thứ ba. Mọi nội dung đều được biên tập dựa trên lợi ích của người dùng.'
    },
    {
      id: 'feedback-corrections',
      title: '4. Phản hồi và chỉnh sửa',
      icon: <CheckCircleIcon />,
      content: 'Chúng tôi hoan nghênh mọi phản hồi từ người dùng. Nếu phát hiện lỗi hoặc nội dung không chính xác, vui lòng liên hệ với chúng tôi để được chỉnh sửa kịp thời.'
    }
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite',
        py: { xs: 3, sm: 4, md: 6 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 25% 75%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0
        },
        '@keyframes gradientShift': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Header Section */}
        <Paper
          elevation={8}
          sx={{
            textAlign: 'center',
            p: { xs: 3, sm: 4, md: 6 },
            mb: { xs: 3, sm: 4 },
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)
              `,
              pointerEvents: 'none'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <EditIcon 
              sx={{ 
                fontSize: { xs: 48, sm: 64 }, 
                color: '#1976d2', 
                mb: 2 
              }} 
            />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#1976d2', 
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
              }}
            >
              Chính Sách Biên Tập
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#555', 
                lineHeight: 1.8,
                maxWidth: '800px',
                mx: 'auto',
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.125rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              Chính sách biên tập của chúng tôi đảm bảo rằng tất cả nội dung được xuất bản đều chính xác, minh bạch và đáng tin cậy. Vui lòng đọc kỹ các chính sách dưới đây.
            </Typography>
          </Box>
        </Paper>

        {/* Mobile Accordion View */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
          {policyData.map((policy, index) => (
            <Accordion
              key={policy.id}
              elevation={4}
              sx={{
                mb: 2,
                borderRadius: '12px !important',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:before': {
                  display: 'none'
                },
                '&.Mui-expanded': {
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#1976d2' }} />}
                sx={{
                  p: 2,
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      mr: 2,
                      color: '#1976d2',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {policy.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#333',
                      fontSize: '1.1rem'
                    }}
                  >
                    {policy.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 2, pt: 0 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#555', 
                    lineHeight: 1.8,
                    fontSize: '0.95rem'
                  }}
                >
                  {policy.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Desktop Card View */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {policyData.map((policy, index) => (
            <Paper
              key={policy.id}
              elevation={6}
              sx={{
                p: 4,
                mb: 3,
                borderRadius: 3,
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box
                  sx={{
                    mr: 3,
                    color: '#1976d2',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 32
                  }}
                >
                  {policy.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#333', 
                      mb: 2,
                      fontSize: '1.5rem'
                    }}
                  >
                    {policy.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#555', 
                      lineHeight: 1.8,
                      fontSize: '1.1rem'
                    }}
                  >
                    {policy.content}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Additional Guidelines Section */}
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            mb: { xs: 3, sm: 4 },
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              mb: 3,
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            5. Các nguyên tắc khác
          </Typography>
          <List sx={{ p: 0 }}>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                py: 1.5,
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                <CheckCircleIcon sx={{ color: '#1976d2', fontSize: { xs: 24, sm: 28 } }} />
              </ListItemIcon>
              <ListItemText 
                primary="Chúng tôi không xuất bản nội dung vi phạm pháp luật hoặc đạo đức."
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    fontWeight: 500,
                    color: '#333'
                  }
                }}
              />
            </ListItem>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                py: 1.5,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                <CheckCircleIcon sx={{ color: '#1976d2', fontSize: { xs: 24, sm: 28 } }} />
              </ListItemIcon>
              <ListItemText 
                primary="Mọi nội dung quảng cáo đều được đánh dấu rõ ràng để phân biệt với nội dung biên tập."
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    fontWeight: 500,
                    color: '#333'
                  }
                }}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Footer Section */}
        <Paper
          elevation={6}
          sx={{
            textAlign: 'center',
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.8) 100%)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.6,
              '& strong': {
                color: '#1976d2',
                fontWeight: 600
              }
            }}
          >
            Nếu bạn có bất kỳ câu hỏi nào về chính sách biên tập, vui lòng liên hệ với chúng tôi qua email: <strong>editorial@dtdrugs.com</strong>.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditorialPolicyPage;