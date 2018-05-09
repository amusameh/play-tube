const dbConnection =  require('./../db_connection');

const addUser = (username, email, password, sex, cb) => {
  const sql = {
    text: 'INSERT INTO users (username, email, password, sex) VALUES ($1, $2, $3, $4)',
    values: [username, email, password, sex]
  }
  dbConnection.query(sql, (err, result) => {
    if(err) return cb(err);
    cb(null, result);
  });
};

const postImport = (data, cb) => {
  const { userId, title, description, link, source, posterUrl, category } = data;
  const sql = {
    text: 'INSERT INTO videos (user_id, title, description, link, source, poster_url, category) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    values: [userId, title, description, link, source, posterUrl, category]
  }
  dbConnection.query(sql, (err, result) => {
    if(err) return cb(err);
    console.log('query postImport result', result.rows);
    cb(null, "you've add a new video succesfully");

  })
}
module.exports = { addUser, postImport };