const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../config/auth.js');

router.post('/register', userController.registerNewUser);
router.post('/login', userController.loginUser);
router.post('/change-password', auth, userController.changePassword);
router.get('/me', auth, userController.getUserDetails);

module.exports = router;
