const express = require('express');
const app = express();

const passport = require('./config/ppconfig');

const port = process.env.PORT || 3000;

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));

// Read cookies so we can check information about the current session
// Session information is stored as a cookie by express-session
app.use(require('cookie-parser')());

// Read form data
app.use(require('body-parser').urlencoded({ extended: true }));

// Set up express sessions, add a secret
app.use(require('cookie-session')(
  { keys: [process.env.SESSIONSECRET],
    name: 'session', 
    maxAge: 2 * 60 * 60 * 1000
  }
));

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