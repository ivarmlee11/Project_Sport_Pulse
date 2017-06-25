const express = require('express');
const router = express.Router();
const request = require('request');

const db = require('../models');

const twitterBot = require('../helpers/twitterBot.js');

const Twit = require('twit');

const ensureAuthenticated = require('../middleware/ensureAuth.js');
// console.log(process.env.TWITTERCONSUMERKEY, process.env.TWITTERCONSUMERSECRET, process.env.BOTACCESSTOKEN, process.env.BOTACCESSTOKENSECRET);
router.get('/', ensureAuthenticated, function(req, res) {

  let username = req.user.username;
  let userId = req.user.user_id;
  let message = 'helloderp';

  let botFollowers = [];
  
  const currentUser = new Twit({
    consumer_key: process.env.TWITTERCONSUMERKEY,
    consumer_secret: process.env.TWITTERCONSUMERSECRET,
    access_token: req.user.token,
    access_token_secret: req.user.tokensecret
  });

  currentUser.post('friendships/create', 
    { 
      'name': 'SportPulseBot',
      'follow': true,
      'user_id': process.env.BOTTWITTERUSERID
    }, function(err, data, res) {

    });

  twitterBot.post('direct_messages/new', 
    { 
      'text': message,
      'screen_name': username,
      'user_id': userId
    }, function(err, data, res) {

    });

  res.render('loggedin', {user: req.user});
});

module.exports = router;