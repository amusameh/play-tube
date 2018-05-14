exports.get = (req, res)=>{
  console.log('ahmed', req.user);
  
  res.render('home');
}
