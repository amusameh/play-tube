const {getUserData, getVideoData, getVideoComments, getVideoSubComments, getSubscribtionCount, isSubscribed} = require('../database/query/get');
const {postSubscribe, removeSubscribtion} = require('../database/query/post');

let videoDetail;
let subscribed;

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

  getVideoComments(req.params.hashed_id, (err, result)=>{
    const commentsDetails = result.map(element=>{
      const date = getDate(element);
      const obj = {
        id: element.id,
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
          subscribed,
          subscribtionCount:result[0].count,
          videoDetail,
          commentsDetails
        })
      })

    })


  })

}

exports.postSubscribe = (req,res)=>{
  const url = req.headers.referer.split('/').pop()
  postSubscribe(req.user[0].id, req.params.channelId,(err, result)=>{
    if (err){
      removeSubscribtion(req.user[0].id, req.params.channelId, (err,result)=>{
        subscribed = false;
        res.redirect('/watch/'+url)
      })
    }else{
      subscribed = true;
      res.redirect('/watch/'+url)
    }
  })
}
