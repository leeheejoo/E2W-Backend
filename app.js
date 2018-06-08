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
eth = require('./modules/eth'); 
eos = require('./modules/eos'); 

auth = require('./modules/auth')();
app.use(auth.initialize());
mongo = require('./db/mongo')();

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
// ethereum
const addressRouter = require('./routes/eth/address');
const balanceRouter = require('./routes/eth/balance');
const transferRouter = require('./routes/eth/transfer');
const transactionHistoryRouter = require('./routes/eth/transactionHistory');

app.use('/', indexRouter);
app.use(`${config.apiVersion}/login`, loginRouter);
app.use(`${config.apiVersion}/register`, registerRouter);
// ethereum
app.use(`${config.apiVersion}/eth/address`, addressRouter);
app.use(`${config.apiVersion}/eth/balance`, balanceRouter);
app.use(`${config.apiVersion}/eth/transfer`, transferRouter);
app.use(`${config.apiVersion}/eth/transactionHistory`, transactionHistoryRouter);

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
