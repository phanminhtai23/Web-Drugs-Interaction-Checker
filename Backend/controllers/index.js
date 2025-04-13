const authController = require('./auth.controller');
const drugController = require('./drugs.controller');
const interactionController = require('./interaction.controller');
const profileController = require('./profile.controller');
const adminController = require('./admin.controller');
const clientController = require('./client.controller');
const interactionHistoryController = require('./interactionhistory.controller');
const prescriptionController = require('./prescription.controller');

module.exports = {
  authController,
  drugController,
  interactionController,
  profileController,
  adminController,
  clientController,
  interactionHistoryController,
  prescriptionController,
};