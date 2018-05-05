const bcrypt = require('bcrypt');
const post = require('./../database/query/post');

exports.get = (req, res) => {
  res.render('register');
};

exports.post = (req, res) => {
  const {username, email, password, sex} = req.body;
  console.log(req.body);
  
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw new Error('hashing password signup', err);
    } else {
      post.addUser(username, email, hash, sex, (err, result) => {
        if(err) throw new Error('add user error', err);
        res.redirect('/login');
      })
    }
  });
}