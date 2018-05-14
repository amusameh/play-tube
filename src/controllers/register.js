const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const post = require('./../database/query/post');

exports.get = (req, res) => {
  res.render('register');
};

exports.post = (req, res) => {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
  req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

  const errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      title: 'Registration Error',
      errors
    });
  } else {
    const {username, email, password,sex} = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw new Error('hashing password signup', err);
      } else {
        post.addUser(username, email, hash, sex, (err, result) => {
          if(err) {
            req.flash('error_msg', 'user exists');
            res.redirect('/register');
          } else {
            req.flash('success_msg', 'You are registered and can now login');
            res.redirect('/login');
          }
        });
      }
    });
  }
}
