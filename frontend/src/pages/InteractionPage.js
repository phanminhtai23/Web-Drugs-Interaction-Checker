import React from 'react';
import InteractionSearch from '../components/InteractionSearch';
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const InteractionPage = () => {
  return (
    <Box className="container" sx={{ 
      py: { xs: 3, sm: 4, md: 5 }, 
      px: { xs: 2, sm: 3 }, 
      backgroundColor: '#f4f6f8' 
    }}>
      <Grid container spacing={{ xs: 3, sm: 4 }}>
        {/* Cột chính: Nội dung kiểm tra tương tác thuốc */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              p: { xs: 3, sm: 4 },
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }, // Responsive font size
                textAlign: { xs: 'center', sm: 'left' }, // Center on mobile
                lineHeight: { xs: 1.2, sm: 1.167 }, // Better line height for mobile
              }}
            >
              Kiểm tra tương tác thuốc
            </Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                textAlign: { xs: 'center', sm: 'left' }, // Center on mobile
                lineHeight: 1.6, // Better line height for mobile
                px: { xs: 1, sm: 0 }, // Padding for mobile
              }}
            >
              Sử dụng công cụ kiểm tra tương tác thuốc của chúng tôi để tìm các tương tác thuốc, thực phẩm và rượu có khả năng gây hại.
            </Typography>
            <InteractionSearch />

            {/* Phần cảnh báo */}
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' }, // Align top on mobile
                flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
                backgroundColor: '#f9f9f9',
                p: { xs: 2.5, sm: 3 }, // Responsive padding
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                gap: { xs: 2, sm: 0 }, // Gap on mobile
              }}
            >
              <WarningAmberIcon 
                color="primary" 
                sx={{ 
                  fontSize: { xs: 40, sm: 50, md: 60 }, // Responsive icon size
                  mr: { xs: 0, sm: 2 }, // No margin right on mobile
                  alignSelf: { xs: 'center', sm: 'flex-start' }, // Center icon on mobile
                }} 
              />
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '0.875rem' }, // Consistent readable size
                  lineHeight: 1.6, // Better line height
                  textAlign: { xs: 'center', sm: 'left' }, // Center on mobile
                }}
              >
                Không phải tất cả các loại thuốc đều tương tác và không phải mọi tương tác đều có nghĩa là bạn phải ngừng dùng một trong các loại thuốc của mình.
                Luôn tham khảo ý kiến ​​bác sĩ chăm sóc sức khỏe của bạn về cách quản lý tương tác thuốc trước khi thực hiện bất kỳ thay đổi nào đối với đơn thuốc hiện tại của bạn.
              </Typography>
            </Box>

            {/* Phần câu hỏi thường gặp */}
           <Box sx={{ mt: { xs: 4, sm: 5 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  textAlign: 'center',
                  color: '#1976d2', // Màu xanh nổi bật
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Responsive font size
                  px: { xs: 1, sm: 0 }, // Padding for mobile
                }}
              >
                Câu hỏi thường gặp về tương tác thuốc
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#ffffff', // Nền trắng đơn giản
                  borderRadius: 2,
                  p: { xs: 1.5, sm: 2 }, // Responsive padding
                }}
              >
                <Accordion
                  disableGutters
                  elevation={0} // Loại bỏ đổ bóng
                  sx={{
                    mb: 2,
                    border: '1px solid #e0e0e0', // Đường viền nhẹ
                    borderRadius: 2,
                    '&:before': { display: 'none' }, // Loại bỏ đường viền mặc định của Accordion
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />}
                    sx={{
                      backgroundColor: '#f5f5f5', // Nền xám nhạt
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#e0e0e0' }, // Hiệu ứng hover
                      px: { xs: 1.5, sm: 2 }, // Responsive padding
                      py: { xs: 1, sm: 1.5 }, // Responsive padding
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                        lineHeight: 1.4, // Better line height
                      }}
                    >
                      Tương tác thuốc là gì?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: '0.85rem', sm: '0.875rem' }, // Responsive font size
                        lineHeight: 1.6, // Better line height
                      }}
                    >
                      Có 3 loại tương tác thuốc chính cần chú ý:
                      <ul>
                        <li>
                          <strong>Tương tác thuốc-thuốc:</strong> Đây là loại tương tác thuốc phổ biến nhất và liên quan đến một loại thuốc tương tác với một loại thuốc khác.
                        </li>
                        <li>
                          <strong>Tương tác thuốc-thức ăn và thuốc-đồ uống:</strong> Thức ăn và đồ uống có thể làm thay đổi cách thuốc hoạt động hoặc làm trầm trọng thêm tác dụng phụ.
                        </li>
                        <li>
                          <strong>Tương tác thuốc-bệnh:</strong> Tình trạng sức khỏe của bạn có thể ảnh hưởng đến cách thuốc hoạt động hoặc dẫn đến tác dụng phụ.
                        </li>
                      </ul>
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    mb: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />}
                    sx={{
                      backgroundColor: '#f5f5f5',
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#e0e0e0' },
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.4,
                      }}
                    >
                      Những dấu hiệu và triệu chứng phổ biến của tương tác thuốc là gì?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                        lineHeight: 1.6,
                      }}
                    >
                      Các dấu hiệu và triệu chứng của tương tác thuốc có thể rất khác nhau. Một số triệu chứng có thể nhẹ, trong khi những triệu chứng khác có thể nghiêm trọng hoặc đe dọa tính mạng.
                      <br />
                      <br />
                      Các dấu hiệu hoặc triệu chứng phổ biến của tương tác thuốc có thể bao gồm:
                      <ul>
                        <li>Buồn ngủ</li>
                        <li>Chóng mặt</li>
                        <li>Buồn nôn hoặc nôn</li>
                        <li>Tiêu chảy</li>
                        <li>Đau nhức cơ bắp</li>
                        <li>Trầm cảm</li>
                        <li>Tăng bầm tím hoặc chảy máu</li>
                        <li>Nhịp tim bất thường</li>
                        <li>Phát ban da</li>
                        <li>Lo lắng hoặc bồn chồn</li>
                        <li>Thuốc của bạn có thể không có tác dụng tốt</li>
                      </ul>
                      Nếu bạn nghĩ rằng mình có thể đang gặp phải triệu chứng hoặc tác dụng phụ do tương tác thuốc, hãy liên hệ ngay với nhà cung cấp dịch vụ chăm sóc sức khỏe để được tư vấn.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    mb: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />}
                    sx={{
                      backgroundColor: '#f5f5f5',
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#e0e0e0' },
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.4,
                      }}
                    >
                      Làm thế nào để tránh tương tác thuốc?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      variant="body2" 
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                        lineHeight: 1.6,
                      }}
                    >
                      Vì bạn có thể không biết thuốc của mình có tương tác gì không nên điều quan trọng là phải kiểm tra chúng trước khi bắt đầu điều trị.
                      <br />
                      <br />
                      Sau đây là một số mẹo về cách tránh tương tác thuốc:
                      <ul>
                        <li>
                          Hãy cho bác sĩ chăm sóc sức khỏe biết về tất cả các loại thuốc theo toa mà bạn đang dùng, cùng với bất kỳ loại thuốc không kê đơn (OTC), bao gồm vitamin, thảo dược hoặc thực phẩm chức năng.
                        </li>
                        <li>
                          Có thể sẽ hữu ích nếu bạn mang theo một danh sách các loại thuốc để trình cho hiệu thuốc và các cuộc hẹn khám bệnh.
                        </li>
                        <li>
                          Hãy trao đổi với bác sĩ chăm sóc sức khỏe và dược sĩ về thuốc của bạn. Tìm hiểu lý do bạn dùng thuốc, tần suất dùng thuốc và liệu bạn có nên tránh dùng thuốc với các loại thuốc khác, rượu, thực phẩm hoặc đồ uống khác không.
                        </li>
                        <li>
                          Hãy yêu cầu bác sĩ hoặc dược sĩ kiểm tra thuốc của bạn để biết bất kỳ tương tác thuốc quan trọng nào. Tìm hiểu cách nhận biết tác động của bất kỳ tương tác thuốc nào.
                        </li>
                        <li>
                          Trong trường hợp xảy ra tương tác thuốc, hãy tìm hiểu khi nào bạn cần gọi cho bác sĩ hoặc 911 để được trợ giúp khẩn cấp.
                        </li>
                      </ul>
                      Tất cả các loại thuốc đều có hướng dẫn bằng văn bản. Hãy tuân thủ chặt chẽ các hướng dẫn đó. Thuốc không kê đơn cũng có nhãn Thông tin về thuốc giúp giải thích về thuốc. Đọc kỹ thông tin này. Nếu bạn không hiểu hướng dẫn, hãy nhờ chuyên gia chăm sóc sức khỏe giúp đỡ.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Cột phụ: Công cụ & tài nguyên phổ biến */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              backgroundColor: '#fff',
              borderRadius: 3,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              mt: { xs: 3, md: 0 },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              Công cụ & tài nguyên phổ biến
            </Typography>
            <List sx={{ '& .MuiListItem-root': { px: { xs: 0, sm: 1 }, py: { xs: 0.5, sm: 1 } } }}>
              <ListItem>
                <Link 
                  href="/drugs" 
                  underline="hover" 
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  Danh sách thuốc hiện có
                </Link>
              </ListItem>
              <ListItem>
                <Link 
                  href="/interactions" 
                  underline="hover" 
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  Kiểm tra tương tác thuốc
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  onClick={(e) => {
                    e.preventDefault();
                    const isLoggedIn = !!localStorage.getItem('token'); // Kiểm tra token trong localStorage
                    if (isLoggedIn) {
                      window.location.href = '/prescriptions'; // Điều hướng đến trang Danh sách thuốc
                    } else {
                      window.location.href = '/login'; // Điều hướng đến trang đăng nhập
                    }
                  }}
                >
                  Danh sách đơn thuốc của tôi
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  onClick={(e) => {
                    e.preventDefault();
                    const isLoggedIn = !!localStorage.getItem('token'); // Kiểm tra token trong localStorage
                    if (isLoggedIn) {
                      window.location.href = '/interaction-history'; // Điều hướng đến trang Lịch sử kiểm tra tương tác thuốc
                    } else {
                      window.location.href = '/login'; // Điều hướng đến trang đăng nhập
                    }
                  }}
                >
                  Lịch sử kiểm tra tương tác thuốc
                </Link>
              </ListItem>
              <ListItem>
                <Link 
                  href="/terms" 
                  underline="hover" 
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  Điều khoản sử dụng
                </Link>
              </ListItem>

              <ListItem>
                <Link 
                  href="/about" 
                  underline="hover" 
                  color="primary"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  Giới thiệu về chúng tôi
                </Link>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InteractionPage;