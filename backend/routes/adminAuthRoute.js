const express = require('express');

const adminAuthController = require('../controllers/adminAuthController');

const router = express.Router();

router.post('/login', adminAuthController.login);
router.post('/logout', adminAuthController.logout);
router.post('/changePassword', adminAuthController.changePassword);

module.exports = router
