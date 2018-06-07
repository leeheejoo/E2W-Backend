const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

retcode = require('./modules/retcode');
account = require('./modules/account');
config = require('./configs/config');
users = require('./db/users'); 

auth = require('./modules/auth')();
app.use(auth.initialize());

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use(`${config.apiVersion}/login`, loginRouter);
app.use(`${config.apiVersion}/register`, registerRouter);
app.use(`${config.apiVersion}/user`, userRouter);

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
