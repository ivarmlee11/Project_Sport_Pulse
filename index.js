const express = require('express');
const app = express();

const passport = require('./config/ppconfig');
// const errorHandler = require('./helpers/redirectOnError');

const port = process.env.PORT || 3000;

// Error handler
// app.use(errorHandler);

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));

// Read form data
app.use(require('body-parser').urlencoded({ extended: true }));

// Read cookies so we can check information about the current session
// Session information is stored as a cookie by express-session
app.use(require('cookie-parser')());

// Set up express session, add a secret
app.use(require('express-session')({ secret: process.env.SESSIONSECRET, resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Controller Routes
const authCtrl = require('./controllers/auth.js');
app.use('/auth', authCtrl);

const loggedInCtrl = require('./controllers/loggedin.js');
app.use('/loggedin', loggedInCtrl);

// Splash route / entry
app.get('/', function(req, res) {
  res.render('splash');
});

app.listen(port);