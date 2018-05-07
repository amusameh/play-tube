exports.get = (req, res) => {
  res.render('login');
}

exports.post = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  
}