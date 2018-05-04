const app = require('./app');

app.listen(app.get('port'),()=>{
  console.log(`Listening to the port: ${app.get('port')}`);
})
