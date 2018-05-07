const dbConnection =  require('./../db_connection');

const addUser = (username, email, password, sex, cb) => {
  const sql = {
    text: 'INSERT INTO users (username, email, password, sex) VALUES ($1, $2, $3, $4)',
    values: [username, email, password, sex]
  }
  dbConnection.query(sql, (err, result) => {
    if(err) return cb( new Error('add User error ', err));
    cb(null, result);
  });
};

const getUser = () => {
  const sql = {
    text: 'SELECT * FROM users'
  }
  dbConnection.query('SELECT * FROM users', (err, result) => {
    if(err) throw new Error(err, 'ahmed');
    console.log(result.rows);
    
  })
}
module.exports = { addUser, getUser };