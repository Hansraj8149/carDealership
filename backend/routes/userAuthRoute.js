const express = require('express');
const userAuthController = require('../controllers/userAuthController');

const router = express.Router();

router.post('/signIn', userAuthController.signIn);
router.post('/signUp', userAuthController.signUp);
router.post('/changePassword', userAuthController.changePassword);

module.exports= router;
