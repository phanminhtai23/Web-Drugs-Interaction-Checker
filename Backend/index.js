const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session
const passport = require("passport");
const connectDB = require("./config/database");
const { PORT } = require("./config/system");
const routes = require("./routes");
const { errorHandler, logger } = require("./middleware");
const path = require("path");
const { cacheDrugs } = require("./controllers/drugs.controller");
const drugRoutes = require("./routes/drug.routes");
const authRoutes = require("./routes/auth.routes");
const helmet = require("helmet");
const contactRoutes = require("./routes/contact.routes"); // Import contact routes
require("./config/passport"); // Import Passport configuration

const app = express();  

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set `secure: true` if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session()); // Enable session support for Passport

// Serve static files
app.use(
    "/assets/avatars",
    express.static(path.join(__dirname, "assets/avatars"))
);

// Middleware
app.use(express.json({ limit: "50mb" }));

// Cấu hình CORS - đặt trước routes
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3002",
    "http://localhost:3001"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Cho phép requests không có origin (như mobile apps hoặc Postman)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(null, true); // Tạm thời cho phép tất cả để debug
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.use(logger); // Log requests

// Connect to the database
connectDB();

// Cache drugs on server startup
cacheDrugs();

// Đặt lịch cập nhật cache mỗi ngày
setInterval(cacheDrugs, 24 * 60 * 60 * 1000); // 24 giờ

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use("/api", routes);
app.use("/api/drugs", drugRoutes);
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);

// // Tắt hoàn toàn helmet để tránh conflict với OAuth
// app.use(helmet({
//     crossOriginOpenerPolicy: false,
// }));

// Error handling middleware
app.use(errorHandler);

// Default route
app.get("/", (req, res) => {
    res.send("API Drug Interaction Running...");
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
