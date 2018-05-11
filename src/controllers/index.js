const express = require('express');
const router = express.Router();

const passport = require('passport');

const home = require('./home');
const register = require('./register');
const importvideo = require('./import');
const login = require('./login');

router.get('/', home.get);
router.get('/login', login.get);
router.post('/login', login.post)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));

router.get('/register', register.get);
router.post('/register', register.post);
router.get('/import-video', importvideo.get);
router.get('/import-vid-info', importvideo.getInfo);
router.post('/import-vid-info', importvideo.post);

module.exports = router;
