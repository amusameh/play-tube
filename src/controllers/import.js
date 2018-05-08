const request = require('request');
const getVideoId = require('get-video-id');

exports.get = (req, res) => {
  const wrongLink = req.query ? req.query.err : false;
  console.log(req.query);
  res.render('importvid', {importVid: true, wrongLink});
}
exports.getInfo = (req, res) => {
  // console.log('req.body info', req.body);//form info
  // console.log('req.query info', req.query);//form info
  // console.log('req.params info', req.params);//form info
  // console.log('req.headers info', req.headers);//form info
  const linkInfo = getVideoId(req.query.videoUrl)
  if (linkInfo.service !== 'youtube') {
    console.log('youtubbbbbbb');
    res.redirect('/import-video?err=true');
  } else {

    const uri = `https://www.googleapis.com/youtube/v3/videos?id=${linkInfo.id}&key=${process.env.API_KEY}&part=snippet&fields=items/snippet(title,description,thumbnails)`

    request.get(uri, (err, response, body) => {
      if (err) {
        console.log('importinfo error', err);

      } else if (response.statusCode === 200) {
        // console.log(body);
        const data = JSON.parse(body).items[0].snippet;
        res.render('importvid', {data, importVid: true, getValues: true});
      } else {
        console.log('Invalid youtube link status code', response.statusCode);
        console.log('body', body);
        res.render('importvid', { importVid: true, wrongLink: true });

      }
    });
  }
}