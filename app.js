import express, { json, urlencoded } from 'express';
import session from 'express-session';
import { urlencoded as _urlencoded, json as _json } from 'body-parser';
import connectFlash from "connect-flash";
import morgan from 'morgan';
import passport, { initialize, session as _session } from 'passport';
import layouts from "express-ejs-layouts";
import { pageNotFoundError } from './controllers/errorController.js';
import usersRouter from './routes/users.js';
import indexRouter from './routes/index.js';
import newsRouter from './routes/news.js';

import bootstrap from 'bootstrap'


//Load db:
import db from './config/db.js';

//Passport config
require('./config/passport')(passport);


app = express();
//app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
//app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))

app.use(connectFlash());

//  Express env setup, set ejs as view engine and initialize port.
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
// Start logger
app.use(morgan('common'));
app.use(json());
app.use(
  _urlencoded({
    extended: false
  }),
  urlencoded({
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
  _json(),
);

//Passport middleware
app.use(initialize());
app.use(_session());



app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

// Middlewares
app.use(layouts);
app.use(json());
app.use(express.static('public'))

//Bind routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);

app.use(pageNotFoundError)

// Start server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://127.0.0.1:${app.get("port")}`);
})