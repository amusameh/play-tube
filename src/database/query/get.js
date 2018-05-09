const dbConnection = require('../db_connection');


const getUserData = (username, cb) => {
  const sql = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username]
  }
  dbConnection.query(sql, (err, result) => {
    if(err) {
      console.log(err);
      cb(err);
    } else {
      console.log(result.rows);
      // res.send(result.rows);
      cb(null, result.rows)
    }
  });
}

module.exports = { getUserData };