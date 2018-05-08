// const pgEscape = require('pg-escape');
// const dbConnect = require('./../db_connection');
// const getTable = (table,cb)=>{

//   const sql = pgEscape('SELECT * FROM %I', table);
//   dbConnect.query(sql, (err,result)=>{
//     if (err) return cb(err)
//     return cb(null,result.rows)
//   })
// }

// getTable("users", (err, result) => {
//   if (err){
//     console.log(err, 'ahmed error');
//   } else {
//     console.log('result', result);
//   }
// })