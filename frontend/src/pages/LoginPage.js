import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Divider,
    InputAdornment,
    IconButton,
} from "@mui/material";
import "../styles/LoginPage.css"; // Import LoginPage styles
import { isValidEmail, isValidPassword } from "../utils/validate"; // Import validate utils
// import googleIcon from '../assets/login/provider-google-logomark-24.svg'; // Import Google icon
import facebookIcon from "../assets/login/provider-facebook-logomark-24.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons// Import Facebook icon
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        setWarning("");
        if (!isValidEmail(email)) {
            setError("Vui lòng nhập địa chỉ email hợp lệ");
            return;
        }
        if (!isValidPassword(password)) {
            setError("Vui lòng nhập mật khẩu hợp lệ (tối thiểu 6 ký tự)");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/auth/login", {
                email,
                password,
                role: "client",
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", "client");
            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }
            setIsLoggedIn(true);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // const { credential } = credentialResponse; // Lấy token từ Google
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/google`,
                {
                    token: credentialResponse.credential,
                }
            );
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", "client");
            localStorage.setItem("user", JSON.stringify(user));
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            console.error(
                error.response?.data?.message || "Google login failed"
            );
            setError(error.response?.data?.message || "Google login failed");
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: { xs: '#f8f9fa', sm: '#ffffff' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1, sm: 2 },
        }}>
            <Box
                component="form" // Biến Box thành form
                onSubmit={(e) => {
                    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
                    handleLogin(); // Gọi hàm đăng nhập
                }}
                sx={{
                    maxWidth: { xs: '95%', sm: 450, md: 500 },
                    width: '100%',
                    mx: "auto",
                    my: { xs: 2, sm: 3, md: 4 },
                    p: { xs: 2.5, sm: 3.5, md: 4 },
                    boxShadow: { 
                        xs: "0px 2px 10px rgba(0, 0, 0, 0.08)", 
                        sm: "0px 4px 20px rgba(0, 0, 0, 0.1)" 
                    },
                    borderRadius: { xs: 3, sm: 4 },
                    background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                    fontFamily: "Roboto, Arial, sans-serif",
                    border: { xs: '1px solid #e3f2fd', sm: 'none' },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #1976d2, #155a9c)',
                        display: { xs: 'block', sm: 'none' },
                    },
                }}
            >
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{
                    fontWeight: "bold",
                    color: "#2C3237FF",
                    fontFamily: "Poppins, Arial, sans-serif",
                    fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
                    lineHeight: { xs: 1.2, sm: 1.167 },
                    mb: { xs: 1, sm: 2 },
                }}
            >
                Đăng Nhập
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                sx={{
                    color: "#6c757d",
                    fontFamily: "Roboto, Arial, sans-serif",
                    display: "block",
                    mb: { xs: 2, sm: 2.5 },
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.5,
                    px: { xs: 1, sm: 0 },
                }}
            >
                Nhập thông tin tài khoản của bạn
            </Typography>
            {error && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: { xs: 2, sm: 2.5 }, 
                        borderRadius: { xs: 1.5, sm: 2 },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        '& .MuiAlert-message': {
                            lineHeight: 1.4,
                        },
                    }}
                >
                    {error}
                </Alert>
            )}
            {warning && (
                <Alert 
                    severity="warning" 
                    sx={{ 
                        mb: { xs: 2, sm: 2.5 }, 
                        borderRadius: { xs: 1.5, sm: 2 },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        '& .MuiAlert-message': {
                            lineHeight: 1.4,
                        },
                    }}
                >
                    {warning}
                </Alert>
            )}
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    fontFamily: "Roboto, Arial, sans-serif",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: { xs: 2, sm: 3 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        height: { xs: '48px', sm: '56px' },
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: { xs: '12px 14px', sm: '16.5px 14px' },
                    },
                    mb: { xs: 1, sm: 1.5 },
                }}
            />
            <TextField
                label="Password"
                type={showPassword ? "text" : "password"} // Hiển thị hoặc ẩn mật khẩu
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái showPassword
                                edge="end"
                                sx={{
                                    color: '#666',
                                    '&:hover': {
                                        color: '#1976d2',
                                    },
                                }}
                            >
                                {showPassword ? (
                                    <VisibilityOff sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                                ) : (
                                    <Visibility sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                                )}{" "}
                                {/* Biểu tượng thay đổi */}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    fontFamily: "Roboto, Arial, sans-serif",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: { xs: 2, sm: 3 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        height: { xs: '48px', sm: '56px' },
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: { xs: '12px 14px', sm: '16.5px 14px' },
                    },
                    mb: { xs: 0.5, sm: 1 },
                }}
            />
            <Typography
                variant="body2"
                align="left"
                sx={{
                    mt: { xs: 1, sm: 1.5 },
                    mb: { xs: 2, sm: 2.5 },
                    fontFamily: "Roboto, Arial, sans-serif",
                    color: "#1976d2",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: { xs: '0.85rem', sm: '0.875rem' },
                    fontWeight: 500,
                    "&:hover": {
                        textDecoration: "underline",
                        color: "#1565c0",
                    },
                    transition: "color 0.2s ease",
                }}
                onClick={() => navigate("/forgot-password")} // Điều hướng đến trang quên mật khẩu
            >
                Quên mật khẩu?
            </Typography>
            <Button
                type="submit" // Gọi hàm đăng nhập khi nhấn nút
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                disabled={loading}
                sx={{
                    mt: { xs: 1, sm: 2 },
                    mb: { xs: 2, sm: 3 },
                    py: { xs: 1.2, sm: 1.5 },
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    fontWeight: "bold",
                    fontFamily: "Poppins, Arial, sans-serif",
                    background: "linear-gradient(90deg, #1976d2, #155a9c)",
                    "&:hover": {
                        background: "linear-gradient(90deg, #155a9c, #1976d2)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    },
                    "&:active": {
                        transform: "translateY(0)",
                    },
                    borderRadius: { xs: 2, sm: 3 },
                    transition: "all 0.3s ease",
                    textTransform: "none",
                    height: { xs: '44px', sm: '48px' },
                }}
            >
                {loading ? (
                    <CircularProgress 
                        size={21} 
                        color="inherit" 
                        sx={{ 
                            width: { xs: '18px', sm: '21px' }, 
                            height: { xs: '18px', sm: '21px' } 
                        }} 
                    />
                ) : (
                    "Đăng Nhập"
                )}
            </Button>

            <Divider sx={{ 
                my: { xs: 2.5, sm: 3 }, 
                color: "#6c757d",
                fontSize: { xs: '0.85rem', sm: '0.875rem' },
                '&::before, &::after': {
                    borderColor: '#e0e0e0',
                },
            }}>
                Hoặc
            </Divider>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 2, sm: 2.5 },
            }}>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        py: { xs: 1, sm: 1.2 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: "bold",
                        fontFamily: "Poppins, Arial, sans-serif",
                        color: "#DB4437",
                        borderColor: "#DB4437",
                        "&:hover": {
                            backgroundColor: "#FBE9E7",
                            borderColor: "#DB4437",
                            transform: "translateY(-1px)",
                        },
                        borderRadius: { xs: 2, sm: 3 },
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textTransform: "none",
                        height: { xs: '42px', sm: '48px' },
                        position: 'relative',
                        overflow: 'hidden',
                        '& .google-login-wrapper': {
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }
                    }}
                >
                    <GoogleOAuthProvider
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    >
                        <Box className="google-login-wrapper">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => console.log("Google Login Failed")}
                                text="signin_with" // Tùy chỉnh văn bản nút
                                shape="pill" // Tùy chỉnh hình dạng nút
                                theme="outline" // Tùy chỉnh giao diện nút
                                size={window.innerWidth < 600 ? "medium" : "large"}
                            />
                        </Box>
                    </GoogleOAuthProvider>
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                        setError("");
                        setWarning("Chức năng này đang phát triển");
                    }}
                    sx={{
                        py: { xs: 1, sm: 1.2 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: "bold",
                        fontFamily: "Poppins, Arial, sans-serif",
                        color: "#4267B2",
                        borderColor: "#4267B2",
                        "&:hover": {
                            backgroundColor: "#E7F3FF",
                            borderColor: "#4267B2",
                            transform: "translateY(-1px)",
                        },
                        borderRadius: { xs: 2, sm: 3 },
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textTransform: "none",
                        height: { xs: '42px', sm: '48px' },
                    }}
                >
                    <img
                        src={facebookIcon}
                        alt="Facebook"
                        style={{ 
                            height: window.innerWidth < 600 ? 20 : 24, 
                            marginRight: 8 
                        }}
                    />
                    Đăng nhập bằng Facebook
                </Button>
            </Box>

            <Typography
                variant="body2"
                align="center"
                sx={{
                    mt: { xs: 1.5, sm: 2 },
                    fontFamily: "Roboto, Arial, sans-serif",
                    color: "#555",
                    fontSize: { xs: '0.85rem', sm: '0.875rem' },
                    lineHeight: 1.5,
                }}
            >
                Không có tài khoản?{" "}
                <a
                    href="/register"
                    style={{
                        color: "#1976d2",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: 'inherit',
                    }}
                    onMouseOver={(e) => e.target.style.textDecoration = "underline"}
                    onMouseOut={(e) => e.target.style.textDecoration = "none"}
                >
                    Đăng ký ngay
                </a>
            </Typography>
        </Box>
        </Box>
    );
};

export default LoginPage;
