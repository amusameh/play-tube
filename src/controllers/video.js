const {getUserData, getAllVideos, getVideoData, getVideoComments, getVideoSubComments, getSubscribtionCount, isSubscribed} = require('../database/query/get');
const {removeLikeDislike, postLike, postSubscribe, removeSubscribtion, insertComment} = require('../database/query/post');

let videoDetail;
let subscribed;
let isOwner;
let allVideos;

const getDate = (commentObj)=>{
  const dateObj = commentObj.created_at;
  const date = dateObj.getUTCMonth()+1 + '-' + dateObj.getUTCDate() + '-' + dateObj.getUTCFullYear();
  return date;
}

exports.get = (req, res)=>{

  getVideoData(req.params.hashed_id, (err,result)=>{
    const dateObj = result[0].created_at;
    const date = dateObj.getUTCMonth()+1 + '-' + dateObj.getUTCDate() + '-' + dateObj.getUTCFullYear();
    videoDetail = {
      videoId:result[0].id,
      videoHashed: result[0].hashed_id,
      title : result[0].title,
      poster:result[0].poster_url,
      url:result[0].link,
      views:50,
      channelId: result[0].user_id,
      channelName:result[0].username,
      publishTime:date,
      category:result[0].category,
      description:result[0].description,
      like:50,
      dislike:60
    }})

    getAllVideos((err, result)=>{
      if(err) return console.log('Could not fetch the video from DB')
      allVideos = result;
    })

  getVideoComments(req.params.hashed_id, (err, result)=>{
    const commentsDetails = result.map(element=>{
      const date = getDate(element);
      const obj = {
        id: element.id,
        userId:element.user_id,
        username: element.username,
        content : element.content,
        time : date,
        child: []
      }
      return obj
    })

    getVideoSubComments(req.params.hashed_id, (err, subComments)=>{

     const addSub = (childArray, subC)=>{
          subC.forEach(subComment => {
            if (childArray[childArray.length-1].id === subComment.parent_id){
              subComment.parent = childArray[childArray.length-1].username
              subComment.parentUserId = childArray[childArray.length-1].user_id
              childArray.push(subComment);
              addSub(childArray, subC)
            }
          })
        }

      commentsDetails.forEach(comment => {
        subComments.forEach(subComment => {
          subComment.time = getDate(subComment);
          if (comment.id === subComment.parent_id){
            subComment.child = []
            comment.child.push(subComment);
            addSub(comment.child, subComments)
          }
        })
      })

      if(req.user){
        //check if the user is the channel owner
        if(+req.user[0].id === videoDetail.channelId){
          isOwner = true;
        }else{
          isOwner = false;
        }

        isSubscribed(req.user[0].id, videoDetail.channelId, (err,result)=>{
          if(err) console.log('user not exist ' ,err);
          subscribed = result[0].exists;
        })
      }else{
        subscribed = false;
      }

      console.log('channel id ', videoDetail.channelId);
      getSubscribtionCount(videoDetail.channelId, (err, result)=>{
        console.log('subscribe ', result);
        res.render('video', {
          css: 'video',
          js: ['mediaPlayer', 'videoPage'],
          subscribed,
          subscribtionCount:result[0].count,
          commentsNumber: commentsDetails.length + subComments.length,
          subscribed,
          isOwner,
          videoDetail,
          allVideos,
          commentsDetails
        })
      })

    })

  })

}

exports.postSubscribe = (req,res)=>{
  //if login
  if(req.user){
    if(req.user[0].id !== +req.params.channelId){
      postSubscribe(req.user[0].id, req.params.channelId,(err, result)=>{
        if (err){
          removeSubscribtion(req.user[0].id, req.params.channelId, (err,result)=>{
            subscribed = false;
            res.redirect('/watch/'+videoDetail.videoHashed)
          })
        }else{
          subscribed = true;
          res.redirect('/watch/'+videoDetail.videoHashed)
        }
      })

    }else{
      res.redirect('/watch/'+videoDetail.videoHashed)
    }
  }else{
    res.redirect('/login')
  }
}

exports.postComment = (req, res)=>{
  if(req.user){
    console.log(req.user[0].id,'::', videoDetail.videoId, '::',req.body.comment);
    insertComment(req.user[0].id, videoDetail.videoId, req.body.comment, null,(err, result)=>{
      if(err) return console.log('error in adding the comment');
      console.log('comment inserted');
      res.redirect('/watch/' + videoDetail.videoHashed)
    })
  }else{
    //should send a messsage teeling the user to login or hide the comment area
    res.redirect('/login')
  }

}

exports.postLike = (req, res)=>{
  addLikeDislike(req, res, 'l');
}

exports.postDisLike = (req, res)=>{
  addLikeDislike(req, res, 'd');
}

const addLikeDislike = (req,res, state)=>{
  postLike(req.user[0].id, videoDetail.videoId, state, (err,result)=>{
    if(err){
      removeLikeDislike(req.user[0].id, videoDetail.videoId, (err, result)=>{
        if(err) console.error(err);
        res.redirect('/watch/'+videoDetail.videoHashed);
        console.log(state + ' removed');
      })
    } else{
      console.log(state + ' added');
      res.redirect('/watch/'+ videoDetail.videoHashed);
    }
  })

}
