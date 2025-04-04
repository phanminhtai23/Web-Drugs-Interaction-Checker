import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/interactions" element={<InteractionPage />} />
          <Route path="/drugs" element={<DrugsListPage />} />
          <Route path="/drugs/:tenThuoc" element={<DrugDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/interaction-history" element={<InteractionHistoryPage />} /> {/* Lịch sử tương tác thuốc */}
          <Route path="/prescriptions" element={<PrescriptionManagementPage />} />{/* Quản lý đơn thuốc */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;