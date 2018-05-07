const express = require('express');
const router = express.Router();

const home = require('./home');
const register = require('./register');
const importvideo = require('./import');

router.get('/', home.get);
router.get('/register', register.get);
router.post('/register', register.post);
router.get('/import', importvideo.get);

module.exports = router;
