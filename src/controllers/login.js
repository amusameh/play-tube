const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const getQuery = require('./../database/query/get');


exports.get = (req, res) => {
  res.render('login');
}

exports.post = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  getQuery.getUserData(username, (err, hashedpassword) => {
    if(err) {
      throw new Error('Something bad happend', err);
    } else {
      console.log(hashedpassword);
      bcrypt.compare(password, hashedpassword, (err, result) => {
        console.log('bcrypt', result);
      });
    }
  });
  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //     User.findOne({ username: username }, function (err, user) {
  //       if (err) { return done(err); }
  //       if (!user) {
  //         return done(null, false, { message: 'Incorrect username.' });
  //       }
  //       if (!user.validPassword(password)) {
  //         return done(null, false, { message: 'Incorrect password.' });
  //       }
  //       return done(null, user);
  //     });
  //   }
  // ));
  
  
}