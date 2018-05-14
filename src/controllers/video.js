const {getUserData, getVideoData, getVideoComments, getVideoSubComments} = require('../database/query/get');

let videoDetail;

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
        subscribtionCount:100,
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
    // console.log(commentsDetails);

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

      res.render('video', {
        videoDetail,
        commentsDetails
      })
    })


  })

}

exports.getSubscribe = (req,res)=>{
  // console.log(req.user);
}
