const express = require('express');
const app = express();
const passport = require('./config/ppConfig');

const port = process.env.PORT || 3000;

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Controller Routes
const authCtrl = require('./controllers/auth.js');
app.use('/auth', authCtrl);

const loggedInCtrl = require('./controllers/loggedin.js');
app.use('/loggedin', loggedInCtrl);

// Splash route
app.get('/', function(req, res) {
  res.render('splash');
});

app.listen(port);