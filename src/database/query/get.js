const dbConnection = require('../db_connection');

const getUserData = (username, cb) => {
  const sql = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username]
  }
  dbConnection.query(sql, (err, result) => {
    if(err) {
      cb(err);
    } else {
      cb(null, result.rows)
    }
  });
}

const getUserById = (id, cb) => {
  const sql = {
    text: 'SELECT id FROM users WHERE id = $1',
    values: [id]
  }
  dbConnection.query(sql, (err, result) => {
    if(err) {
      cb(err);
    } else {
      cb(null, result.rows)
    }
  });
}

module.exports = { getUserData, getUserById };