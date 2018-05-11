const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

// auth modules
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const controllers = require('./controllers');
const helpers = require('./views/helpers');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',
    exphbs({
      extname: 'hbs',
     layoutsDir: path.join(__dirname, 'views', 'layouts'),
     partialsDir: path.join(__dirname, 'views', 'partials'),
     defaultLayout: 'main',
     helpers,
    })
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(controllers);

app.use((req, res, next) => {
  res.locals.info = req.flash('info')
  next()
})

module.exports = app;
