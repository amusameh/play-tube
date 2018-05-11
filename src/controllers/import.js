const request = require('request');
const getVideoId = require('get-video-id');

const { postImport } = require('./../database/query/post');
const { generatevidId } = require('./general');

let videoUrl = '';
let videoSrc = '';
let linkInfo = '';

exports.get = (req, res) => {
  res.render('importvid', { importVid: true });
}

exports.getInfo = (req, res) => {
  if(Object.keys(req.query).length > 0) {
    linkInfo = getVideoId((req.query.videoUrl).toString());
  } else {
    linkInfo = getVideoId('req.query is empty');
  }
  if (linkInfo.service !== 'youtube') {
    res.render('importvid', { importVid: true, wrongService: true});
  } else {
    videoSrc = linkInfo.service;
    const uri = `https://www.googleapis.com/youtube/v3/videos?id=${linkInfo.id}&key=${process.env.API_KEY}&part=snippet&fields=items/snippet(title,description,thumbnails)`

    request.get(uri, (err, response, body) => {
      body = JSON.parse(body)
      // console.log(uri)
      if (err) {
        console.log('importinfo error', err);
      } else if (response.statusCode === 200 && body.items.length > 0) {
        const data = body.items[0].snippet;
        videoUrl = req.query.videoUrl;
        res.render('importvid', { data, importVid: true, getValues: true, videoUrl});
      } else {
        console.log('Invalid youtube link status code', response.statusCode);
        console.log('body', body);
        res.render('importvid', { importVid: true, wrongLink: true });
      }
    });
  }
}
exports.post = (req, res) => {
  console.log(videoUrl, 'vidURl'); // we can check if user changed the vidUrl
  const data = req.body;
  data.source = videoSrc;
  data.hashedId = generatevidId();
  data.userId = 1;  //get the user id from the token
  console.log(data);
  postImport(data, (err, result) => {
    if (err) {
      console.log(err, 'posterr');
      res.render('importvid', { importVid: true, databaseError: true, err });
    } else {
      //popUp
      req.flash('info', 'succesfully import the video');
      res.redirect('/');
    }
  });
}