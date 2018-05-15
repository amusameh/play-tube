const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const getQuery = require('./../database/query/get');

exports.get = (req, res) => {
  res.render('login', { css: 'login'});
}