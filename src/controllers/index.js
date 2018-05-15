const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const bcrypt = require('bcrypt');

const home = require('./home');
const register = require('./register');
const importvideo = require('./import');
const login = require('./login');
const get = require('../database/query/get')
const video = require('./video');



router.get('/', home.get);
router.get('/login', login.get);

passport.use(new LocalStrategy(
	function (username, password, done) {
		get.getUserData(username, function (err, data) {
			if (!data.length) {
        console.log('error', err);

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
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.session.cookie.maxAge = 0;
  req.session.destroy((err) => {
    res.redirect('/');
  });
  // res.clearCookie('black_sail');
})

router.get('/watch/:hashed_id', video.get);
router.get('/subscribe/:channelId', ensureLoggedIn('/login'),video.postSubscribe);
router.get('/like/:videoId', ensureLoggedIn('/login'),video.postLike);
router.get('/disLike/:videoId', ensureLoggedIn('/login'),video.postDisLike);
router.post('/addComment', ensureLoggedIn('/login'),video.postComment);
router.get('/register', register.get);
router.post('/register', register.post);
router.get('/import-video', ensureLoggedIn('/login'), importvideo.get);
router.get('/import-vid-info', ensureLoggedIn('/login'), importvideo.getInfo);
router.post('/import-vid-info', ensureLoggedIn('/login'), importvideo.post);

module.exports = router;
