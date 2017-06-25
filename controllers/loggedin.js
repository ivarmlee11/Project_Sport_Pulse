const express = require('express');
const router = express.Router();

const db = require('../models');

const TwitterBot = require('../helpers/twitterbot.js');
const request = require('request');

const ensureAuthenticated = require('../middleware/ensureAuth.js');

console.log(process.env.TWITTERCONSUMERKEY, process.env.TWITTERCONSUMERSECRET, process.env.BOTACCESSTOKEN, process.env.BOTACCESSTOKENSECRET);

router.get('/', ensureAuthenticated, function(req, res) {

  let username = req.user.username;
  let userId = req.user.user_id;
  let message = 'helloderp';

  let botFollowers = [];
  
  let postReqString = 'https://api.twitter.com/1.1/friendships/create.json?user_id=' + process.env.BOTTWITTERUSERID + '&follow=true';
  
  request.post(postReqString, function(data) {
    console.log('added');
  });

  TwitterBot.post('direct_messages/new', 
    { 
      'text': message,
      'screen_name': username,
      'user_id': userId
    }, function(err, data, res) {

    });

  res.render('loggedin');
});

module.exports = router;