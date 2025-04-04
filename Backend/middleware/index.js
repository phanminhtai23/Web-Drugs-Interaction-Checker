const authMiddleware = require('./auth.middleware');
const errorHandler = require('./error.middleware');
const validateRequest = require('./validate.middleware');
const logger = require('./logger.middleware');
const roleMiddleware = require('./role.middleware');

module.exports = {
  authMiddleware,
  errorHandler,
  validateRequest,
  logger,
  roleMiddleware
};