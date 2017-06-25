const express = require('express');
const app = express();

const passport = require('./config/ppconfig');

const port = process.env.PORT || 3000;

// Use public folder for static assets
app.use(express.static('public'));

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');

const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require('morgan')('combined'));  

// Read form data
app.use(require('body-parser').urlencoded({ extended: true }));

// Set up express session, add a secret
app.use(require('express-session')({ secret: process.env.SESSIONSECRET, resave: true, saveUninitialized: true }));

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