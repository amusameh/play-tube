const express = require('express');
const router = express.Router();

const home = require('./home');
const register = require('./register');
const importvideo = require('./import');
const login = require('./login');

router.get('/', home.get);
router.get('/login', login.get);
router.get('/register', register.get);
router.post('/register', register.post);
router.get('/import', importvideo.get);
router.post('/import-vid-info', importvideo.getInfo);

module.exports = router;
