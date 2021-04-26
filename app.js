const express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  connectFlash = require("connect-flash"),
  morgan = require('morgan'),
  passport = require('passport'),
  layouts = require("express-ejs-layouts"),
  errorController = require('./controllers/errorController'),
  usersRouter = require('./routes/users'),
  indexRouter = require('./routes/index'),
  newsRouter = require('./routes/news');


// Start logger
app.use(morgan('dev'));


//Load db:
const db = require('./config/db');

require('dotenv').config();
//Passport config
require('./config/passport')(passport);


app = express();


app.use(connectFlash());

//  Express env setup, set ejs as view engine and initialize port.
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  }),
  express.urlencoded({
    extended: false
  }),
  session({
    secret: "someSecret621",
    cookie: {
      maxAge: 4000000,
      sameSite: 'Strict'
    },
    resave: false,
    saveUninitialized: false
  }),
  bodyParser.json(),
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

// Middlewares
app.use(layouts);
app.use(express.json());
app.use(express.static("public"));

//Bind routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);

app.use(errorController.pageNotFoundError)

// Start server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://127.0.0.1:${app.get("port")}`);
})