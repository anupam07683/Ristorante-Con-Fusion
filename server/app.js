var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
const session = require('express-session');
const FileStrore = require('session-file-store')(session);

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promotionRouter  =require('./routes/promotionRouter');
var uploadRouter = require('./routes/uploadRouter');
var favouritesRouter = require('./routes/favouritesRouter');
var commentRouter = require('./routes/commentRouter');

var app = express();

app.all('*',(req,res,next) => {
  if(req.secure) {
    return next();
  }
  else{
    res.redirect(307,'https://'+req.hostname + ':' + app.get('secPort')+req.url)
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(session({
//   name:'session-id',
//   resave:false,
//   saveUninitialized:false,
//   secret:"abcdefghijklmnopqrtswxyz",
//   maxAge: 1000*60*60*5,
//   store : new FileStrore()
// }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// app.use(passport.session());

const config = require('./config');
const Dishes = require('./models/dishes');
const url = config.mongoUrl;
const connect = mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true });

connect.then((db) => {
    console.log("Connected correctly to mongodb server ");
}, (err) => { console.log(err); });

app.use('/', indexRouter);
app.use('/dishes',dishRouter);
app.use('/leaders',leaderRouter);
app.use('/promotions',promotionRouter);
app.use('/users', usersRouter);
app.use('/uploads',uploadRouter);
app.use('/favourites',favouritesRouter);
app.use('/comments',commentRouter);

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
