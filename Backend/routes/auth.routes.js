const express = require("express");
const { authController } = require("../controllers");
const { validateRequest } = require("../middleware");
const { body } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const Client = require("../models/client.model");
const router = express.Router();

// Đăng ký
router.post(
    "/register",
    [
        body("full_name").notEmpty().withMessage("Full name is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("role").isIn(["admin", "client"]).withMessage("Invalid role"),
        body("phone")
            .optional()
            .isMobilePhone()
            .withMessage("Invalid phone number"),
        body("date_of_birth")
            .optional()
            .isISO8601()
            .withMessage("Invalid date of birth"),
        body("gender")
            .optional()
            .isIn(["Nam", "Nữ", "Khác"])
            .withMessage("Invalid gender"),
        body("address").optional().isString().withMessage("Invalid address"),
        body("medical_history")
            .optional()
            .isArray()
            .withMessage("Medical history must be an array"),
    ],
    validateRequest,
    authController.register
);

// Đăng nhập
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").notEmpty().withMessage("Password is required"),
        body("role").isIn(["admin", "client"]).withMessage("Invalid role"),
    ],
    validateRequest,
    authController.login
);

// Google Login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user.id, role: "client" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.redirect(
            `${process.env.FRONTEND_URL}/login-success?token=${token}`
        );
    }
);

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
    const { token } = req.body;
    console.log("Received Google Token:", token);
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Phải khớp với GOOGLE_CLIENT_ID
        });
        console.log("Google Payload:", ticket.getPayload());
        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;

        const userData = {
            google_id: sub,
            email,
            full_name: name,
            profile_picture: picture,
            auth_provider: "google",
        };

        const user = await Client.findOneAndUpdate(
            { email }, // tìm theo email
            { $set: userData }, // cập nhật tất cả thông tin
            { upsert: true, new: true } // tạo mới nếu chưa tồn tại
        );

        const jwtToken = jwt.sign(
            { id: user._id, role: "client" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({ token: jwtToken, user });
    } catch (error) {
        console.error(`[Google Auth Error]: ${error.message}`);
        res.status(400).json({ message: "Invalid Google token" });
    }
});

router.get(
    "/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            const token = jwt.sign(
                { id: req.user.id, role: "client" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.redirect(
                `${process.env.FRONTEND_URL}/login-success?token=${token}`
            ); // Chuyển token đến frontend
        } catch (error) {
            console.error("Facebook Login Error:", error);
            res.redirect(
                `${process.env.FRONTEND_URL}/login?error=Facebook login failed`
            );
        }
    }
);

router.post(
    "/forgot-password",
    [body("email").isEmail().withMessage("Invalid email")],
    validateRequest,
    authController.forgotPassword
);

router.post(
    "/verify-otp",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
    ],
    validateRequest,
    authController.verifyOtp
);

router.post(
    "/reset-password",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    validateRequest,
    authController.resetPassword
);

module.exports = router;
