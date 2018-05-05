const fs = require('fs');
const dbConnection = require('./db_connection');
const runBuild = (cb) =>{
  fs.readFile(path.join(__dirname, 'db_build.sql'), (err, file) => {
    if(err) {
      cb(new Error('database connection failed', err));
    } else {
      dbConnection.query(data, (err, result) => {
        if (err) {
          cb(new Error('query error', err));
        } else {
          cb(null, result);
        }
      });
    }
  });
} 

module.exports = runBuild;