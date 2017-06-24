const db = require('../models');
const express = require('express');
const passport = require('../config/ppconfig.js');
const router = express.Router();

router.get('/twitter', 
  passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter',  { failureRedirect: '/' }), 
  function(req, res) {
  res.redirect('/loggedin/');
});

module.exports = router;