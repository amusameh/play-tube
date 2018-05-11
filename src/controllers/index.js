const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const home = require('./home');
const register = require('./register');
const importvideo = require('./import');
const login = require('./login');
const get = require('../database/query/get')

// Get Homepage
router.get('/', home.get);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
    //req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}

// Get loginpage
router.get('/login', login.get);

passport.use(new LocalStrategy(  
	function (username, password, done) {
		get.getUserData(username, function (err, data) {
			if (!data.length) {
				return done(null, false, { message: 'Unknown User' });
			}
      user = data[0];
			if (err) throw err;
			bcrypt.compare(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
  })
);
  
passport.serializeUser(function (user, done) {  
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  get.getUserById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/');
});

router.get('/register', register.get);
router.post('/register', register.post);
router.get('/import-video',ensureAuthenticated, importvideo.get);
router.get('/import-vid-info',ensureAuthenticated, importvideo.getInfo);
router.post('/import-vid-info', importvideo.post);

module.exports = router;
