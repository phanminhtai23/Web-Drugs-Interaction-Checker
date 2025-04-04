const express = require('express');
const { authController } = require('../controllers');
const { validateRequest } = require('../middleware');
const { body } = require('express-validator');

const router = express.Router();

// Đăng ký
router.post(
  '/register',
  [
    body('full_name').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['admin', 'client']).withMessage('Invalid role'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('date_of_birth').optional().isISO8601().withMessage('Invalid date of birth'),
    body('gender').optional().isIn(['Nam', 'Nữ', 'Khác']).withMessage('Invalid gender'),
    body('address').optional().isString().withMessage('Invalid address'),
    body('medical_history').optional().isArray().withMessage('Medical history must be an array'),
    body('favorite_drugs').optional().isArray().withMessage('Favorite drugs must be an array'),
    body('profile_picture').optional().isURL().withMessage('Invalid profile picture URL')
  ],
  validateRequest,
  authController.register
);

// Đăng nhập
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').isIn(['admin', 'client']).withMessage('Invalid role'),
  ],
  validateRequest,
  authController.login
);

module.exports = router;