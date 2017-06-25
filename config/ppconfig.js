const express = require('express');
const passport = require('passport');
const db = require('../models');

const TwitterStrategy = require('passport-twitter').Strategy;

// Configure the Twitter strategy for use by Passport.

// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTERCONSUMERKEY,
    consumerSecret: process.env.TWITTERCONSUMERSECRET,
    callbackURL: process.env.TWITTERAUTHDEVCALLBACK
  },
  function(token, tokenSecret, profile, cb) {
    db.user.findOrCreate({
      where: {
        userid: profile.id,
        username: profile.username,
        twitteravi: profile.photos[0].value,
        token: token,
        tokensecret: tokenSecret
      }
    }).spread(function(user, created) {
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;