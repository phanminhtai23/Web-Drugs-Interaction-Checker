import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate, } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import DrugDetails from './components/DrugDetails';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import InteractionPage from './pages/InteractionPage';
import DrugsListPage from './pages/DrugsListPage';
import AdminPage from './pages/AdminPage'; // Trang admin
import InteractionHistoryPage from './pages/InteractionHistoryPage';
import PrescriptionManagementPage from './pages/PrescriptionManagementPage';
import './styles/global.css'; // Import global styles
import { removeLocalStorage } from './utils/storage'; // Import storage utils
import AboutPage from './pages/AboutPage';
import AdvertisingPage from './pages/AdvertisingPage';
import AttributionPage from './pages/AttributionPage';
import TermsPage from './pages/TermsPage';
import EditorialPolicyPage from './pages/EditorialPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactPage from './pages/ContactPage'; 
import LoginSuccessPage from './pages/LoginSuccessPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    setIsLoggedIn(true);
  }
  }, []);

  const handleLogout = () => {
    removeLocalStorage('token'); // Xóa token khi logout
    setIsLoggedIn(false);
  };


  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div style={{ minHeight: 'calc(100vh - 64px - 50px)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/interactions" element={<InteractionPage />} />
          <Route path="/drugs" element={<DrugsListPage />} />
          <Route path="/drugs/:tenThuoc" element={<DrugDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/interaction-history" element={<InteractionHistoryPage />} /> {/* Lịch sử tương tác thuốc */}
          <Route path="/prescriptions" element={<PrescriptionManagementPage />} />{/* Quản lý đơn thuốc */}
          <Route path="/drugs/:tenThuoc" element={<DrugDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/advertising" element={<AdvertisingPage />} />
          <Route path="/attribution" element={<AttributionPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/editorial" element={<EditorialPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login-success" element={<LoginSuccessPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;