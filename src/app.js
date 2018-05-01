const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const controllers = require('./controllers');
const helpers = require('./views/helpers');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);

app.engine('hbs',
    exphbs({
      extname: 'hbs',
     layoutsDir: path.join(__dirname, 'views', 'layouts'),
     partialsDir: path.join(__dirname, 'views', 'partials'),
     defaultLayout: 'main',
     helpers,
    })
);

module.exports = app;
