const express = require('express');
const router = express.Router();

const passport = require('passport');

const home = require('./home');
const register = require('./register');
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

module.exports = router;
