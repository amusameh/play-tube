const dbConnection = require('../db_connection');

const getUserData = (username, cb) => {
  const sql = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username]
  }
  executeQuery(sql, cb);
}

const getUserById = (id, cb)=>{
  const sql = {
    text: 'SELECT id, username FROM users WHERE id = $1',
    values: [id]
  }
  executeQuery(sql, cb);
}

const getVideoData = (hashed_id, cb)=>{
  const sql = {
    text:'SELECT username, videos.* FROM videos INNER JOIN users ON videos.user_id = users.id WHERE hashed_id = $1',
    values:[hashed_id]
  }
  executeQuery(sql, cb);
}

const getVideoComments = (hashed_id, cb)=>{
  const sql = {
    text:'SELECT DISTINCT username, comments.* FROM comments INNER JOIN users ON comments.user_id = users.id '+
    ' INNER JOIN videos ON comments.video_id = (SELECT id from videos WHERE hashed_id = $1) WHERE comments.parent_id IS NULL ORDER BY created_at DESC;',
    values:[hashed_id]
  }
  executeQuery(sql, cb);

}

const getVideoSubComments = (hashed_id, cb)=>{
  const sql = {
    text:'SELECT DISTINCT username,comments.id, comments.user_id, comments.parent_id, comments.content, comments.created_at FROM comments INNER JOIN users ON comments.user_id = users.id '+
    ' INNER JOIN videos ON comments.video_id = (SELECT id from videos WHERE hashed_id = $1) WHERE comments.parent_id IS NOT NULL ORDER BY created_at DESC;',
    values:[hashed_id]
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
  getUserData,
  getVideoData,
  getVideoComments,
  getVideoSubComments,
  getUserById
 };
