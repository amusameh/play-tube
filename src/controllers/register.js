
const bcrypt = require('bcrypt');

exports.get = (req, res) => {
  res.render('login');
};

exports.post = (req, res) => {
  const {username, email, password, sex} = body.res
  console.log(body.res);
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw new Error(err, 'hashing password signup');
    } else {
      
    }
  })

  
}