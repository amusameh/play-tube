const request = require('request');
const getVideoId = require('get-video-id');

const { postImport } = require('./../database/query/post');
const { generatevidId } = require('./general');

let videoUrl = '';
let videoSrc = '';
let linkInfo = '';

exports.get = (req, res) => {
  res.render('importvid', { css: 'import-video' });
}

exports.getInfo = (req, res) => {
  linkInfo = getVideoId((req.query.videoUrl).toString());
  if (linkInfo.service !== 'youtube') {
    res.render('importvid', { css: 'import-video', importVid: true, wrongService: true });
  } else {
    videoSrc = linkInfo.service;
    const uri = `https://www.googleapis.com/youtube/v3/videos?id=${linkInfo.id}&key=${process.env.API_KEY}&part=snippet&fields=items/snippet(title,description,thumbnails)`

    request.get(uri, (err, response, body) => {
      body = JSON.parse(body)
      if (err) {
        console.error('importinfo error', err);
        res.render('error');
      } else if (response.statusCode === 200 && body.items.length > 0) {
        const data = body.items[0].snippet;
        videoUrl = req.query.videoUrl;
        res.render('importvid', { css: 'import-video', data, importVid: true, getValues: true, videoUrl });
      } else {
        res.render('importvid', { css: 'import-video', importVid: true, wrongLink: true });
      }
    });
  }
}

exports.post = (req, res) => {
  const data = req.body;
  data.hashedId = generatevidId();
  data.userId = req.user[0].id;
  postImport(data, (err, result) => {
    if (err) {
      console.error(err, 'post_error');
      res.render('importvid', { css: 'import-video', importVid: true, databaseError: true, err });
    } else {
      req.flash('success_msg', 'you have imported your video succesfully');
      res.redirect('/');
    }
  });
}