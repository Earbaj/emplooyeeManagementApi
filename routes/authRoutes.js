const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/api/register', auth.register);
router.post('/api/login', auth.login);

module.exports = router;
