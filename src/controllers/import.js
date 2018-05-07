exports.get = (req, res) => {
  res.render('importvid', {importVid: true});
}
exports.getInfo = (req, res) => {
  console.log(req.body);

}