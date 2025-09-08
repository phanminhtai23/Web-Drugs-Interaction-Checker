const express = require("express");
const authRoutes = require("./auth.routes");
const drugRoutes = require("./drug.routes");
const interactionRoutes = require("./interaction.routes");
const profileRoutes = require("./profile.routes");
const adminRoutes = require("./admin.routes");
const clientRoutes = require("./client.routes");
const prescriptionRoutes = require("./prescription.routes");
const interactionHistoryRoutes = require("./interactionhistory.routes");
const contactRoutes = require("./contact.routes"); // Import contact routes
const router = express.Router();

// Định tuyến các route
router.use("/auth", authRoutes);
router.use("/drugs", drugRoutes);
router.use("/interactions", interactionRoutes);
router.use("/profile", profileRoutes);
router.use("/admin", adminRoutes);
router.use("/client", clientRoutes); // Thông tin người dùng
router.use("/prescriptions", prescriptionRoutes); // Quản lý đơn thuốc
router.use("/interaction-history", interactionHistoryRoutes); // Lịch sử kiểm tra tương tác
router.use("/contact", contactRoutes);
// Health check endpoint for Docker
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Backend is healthy',
    timestamp: new Date().toISOString()
  });
});
module.exports = router;
