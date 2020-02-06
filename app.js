require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const port = process.env.SERVER_PORT;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Cors = require('cors');
const xssFilter = require('x-xss-protection');

var app = express();

const usersRouter = require('./src/routes/users')
const itemRouter = require('./src/routes/item')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(xssFilter());
app.use(Cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
  console.log(`\n App Listen post ${port}`);
})

app.use('/users', usersRouter);
app.use('/item', itemRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
