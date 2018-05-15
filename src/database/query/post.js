const dbConnection =  require('./../db_connection');

const addUser = (username, email, password, sex, cb) => {
  const sql = {
    text: 'INSERT INTO users (username, email, password, sex) VALUES ($1, $2, $3, $4)',
    values: [username, email, password, sex]
  }
  executeQuery(sql, cb);
};

const postImport = (data, cb) => {
  const { userId, title, description, link, posterUrl, videoCategory, hashedId } = data;
  const sql = {
    text: 'INSERT INTO videos (user_id, title, description, link, poster_url, category, hashed_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    values: [userId, title, description, link, posterUrl, videoCategory, hashedId]
  }
  dbConnection.query(sql, (err, result) => {
    if(err) return cb(err);
    cb(null, "you've add a new video succesfully");
  })
}

const insertComment = (userId, videoId, content, parentID, cb)=>{
  const sql = {
    text: 'INSERT INTO comments (user_id, video_id, content, parent_id) VALUES ($1, $2, $3, $4)',
    values: [userId, videoId, content, parentID]
  }
  executeQuery(sql, cb);
}

const postSubscribe = (userId, channelId, cb)=>{
  const sql = {
    text:'INSERT INTO subscribe (user_id, channel_id, deleted) VALUES ($1, $2, DEFAULT);',
    values:[userId,channelId]
  }
  executeQuery(sql, cb);
}

const postLike = (userId, videoId, state, cb)=>{
  const sql = {
    text:'INSERT INTO likes_dislikes (user_id, video_id, like_state) VALUES ($1, $2, $3);',
    values:[userId,videoId,state]
  }
  executeQuery(sql, cb);
}

const removeLikeDislike = (userId, videoId, cb)=>{
  const sql = {
    text: 'DELETE FROM likes_dislikes WHERE user_id = $1 AND video_id = $2',
    values: [userId,videoId]
  }
  executeQuery(sql, cb);
}

const removeSubscribtion = (userId, channelId, cb)=>{
  const sql = {
    text: 'DELETE FROM subscribe WHERE user_id = $1 AND channel_id = $2',
    values: [userId, channelId]
  }
  executeQuery(sql, cb);
}

const executeQuery = (sql, cb)=>{
  dbConnection.query(sql, (err, result) => {
    if(err) {
      cb(err);
    } else {
      cb(null, result.rows)
    }
  });
}


module.exports = {
    addUser,
    postImport,
    postSubscribe,
    removeSubscribtion,
    insertComment,
    postLike,
    removeLikeDislike
  };
