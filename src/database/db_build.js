const fs = require('fs');
const dbConnection = require('./db_connection');
const runBuild = (cb) =>{
  fs.readFile(path.join(__dirname, 'db_build.sql'), (err, file) => {
    if(err) {
      console.error('database connection failed', err)
      cb(err);
    } else {
      dbConnection.query(data, (err, result) => {
        if (err) {
          console.error('query db_build error', err);
          cb(err);
        } else {
          cb(null, result);
        }
      });
    }
  });
}

module.exports = runBuild;