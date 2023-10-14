
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var router = express.Router();
const multer = require('multer');

require('./passport-config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var productRouter = require('./routes/product');
var commandeRouter = require('./routes/commande');
var sectionRouter = require('./routes/section') 

var MailRouter = require('./routes/mail') ;
var fileRouter = require('./routes/file');
var userRouter = require('./routes/users')

var app = express();

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('/product', passport.authenticate('jwt', { session: false }), productRouter);
app.use('/commande', passport.authenticate('jwt', { session: false }), commandeRouter);
app.use('/section', passport.authenticate('jwt', { session: false }), sectionRouter);
app.use('/sendMail', passport.authenticate('jwt',{session : false }), MailRouter);
app.use('/File', passport.authenticate('jwt', { session:false }), fileRouter);

app.use('/User', passport.authenticate('jwt', { session:false }), userRouter);



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


 
router.get('/', function(req, res, next) {
  res.json({name: 'app'});
}); 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express ' });
});


module.exports = router;
 

module.exports = app;

