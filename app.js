var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var UsersRouter = require('./routes/router');


// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/login')]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = require("./models/sequelize");
db.AuthorTB.sync();
db.BookTB.sync();
db.LibraryTB.sync();
db.UserBooksTB.sync();
db.UserTB.sync();
db.RolesTB.sync();
db.PermisionsTB.sync();
db.UserPermissionsTB.sync();

app.use(UsersRouter);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
   const accessToken = req.headers["x-access-token"];
   const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
   // Check if token has expired
   if (exp < Date.now().valueOf() / 1000) { 
    return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
   } 
   res.locals.loggedInUser = await User.findById(userId); next(); 
  } else { 
   next(); 
  } 
 });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next){
  // log it
  if (!module.parent) console.error(err.stack);

  // error page
  res.status(500).render('505');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


module.exports = app;
