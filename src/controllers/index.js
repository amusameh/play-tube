const express = require('express');
const router = express.Router();

const home = require('./home');
const register = require('./register');

router.get('/', home.get);
router.get('/register', register.get);
router.post('/register', register.post);

module.exports = router;
