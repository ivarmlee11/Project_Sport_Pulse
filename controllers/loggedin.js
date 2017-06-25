const express = require('express');
const router = express.Router();
const request = require('request');

const db = require('../models');

const Twit = require('twit');

const fakeUpdates = ['Anthony Rizzo pops out to shallow infield to Martín Prado.', 'Kris Bryant singles to left field.', 'Ian Happ flies out to deep right field to Giancarlo Stanton.', 'Addison Russell reaches on a fielder\'s choice to third base. Kris Bryant out at second.', 'Ichiro Suzuki reaches on error. Fielding error by Addison Russell.', 'Giancarlo Stanton lines out to third base to Tommy La Stella.', 'Justin Bour walks. Ichiro Suzuki to second.', 'Marcell Ozuna singles to center field. Justin Bour to second. Ichiro Suzuki scores.', 'J.T. Realmuto strikes out swinging.', 'Martín Prado doubles to deep left center field. Marcell Ozuna scores. Justin Bour scores.', 'Derek Dietrich singles to shallow infield. Martín Prado to third.', 'J.T. Riddle grounds out to second base, Javier Báez to Anthony Rizzo.', 'Miguel Montero walks.', 'Tommy La Stella pops out to first base to Justin Bour.', 'Javier Báez walks. Miguel Montero to second.', 'Mike Montgomery out on a sacrifice bunt to shallow infield, Edinson Vólquez to Derek Dietrich. Javier Báez to second. Miguel Montero to third.', 'Jon Jay walks.', 'Anthony Rizzo flies out to center field to Ichiro Suzuki.', 'Edinson Vólquez called out on strikes.', 'Ichiro Suzuki grounds out to shallow infield, Mike Montgomery to Anthony Rizzo.', 'Giancarlo Stanton walks.', 'Justin Bour grounds out to second base, Javier Báez to Anthony Rizzo.', 'Kris Bryant walks.', 'Ian Happ strikes out swinging.', 'Addison Russell pops out to Martín Prado.', 'Miguel Montero flies out to center field to Ichiro Suzuki.', 'Marcell Ozuna called out on strikes.', 'J.T. Realmuto singles to third base.', 'Martín Prado grounds out to shortstop', 'Addison Russell to Anthony Rizzo.', 'Derek Dietrich hit by pitch.', 'J.T. Riddle flies out to left field to Jon Jay.', 'Tommy La Stella singles to center field.', 'Javier Báez singles to left field. Tommy La Stella to second.', 'Mike Montgomery called out on strikes'];

const twitterBot = new Twit({
  consumer_key: process.env.TWITTERCONSUMERKEY,
  consumer_secret: process.env.TWITTERCONSUMERSECRET,
  access_token: process.env.BOTACCESSTOKEN,
  access_token_secret: process.env.BOTACCESSTOKENSECRET
});

const ensureAuthenticated = require('../middleware/ensureAuth.js');
// console.log(process.env.TWITTERCONSUMERKEY, process.env.TWITTERCONSUMERSECRET, process.env.BOTACCESSTOKEN, process.env.BOTACCESSTOKENSECRET);
router.get('/', ensureAuthenticated, function(req, res) {

  let username = req.user.username;
  let userId = req.user.user_id;

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

 

  res.render('loggedin', {user: req.user});
});

let num = 0;

setInterval(function() {
  let message = fakeUpdates[num];

  if (num <= (fakeUpdates.length - 1)) {
    num += 1;
  } else {
    num = 0;
  }

  twitterBot.get('https://api.twitter.com/1.1/followers/ids.json', function(err, data, res) {
    console.log(data);
    if(data.ids) {
      console.log(data.ids.length + ' number of users');
      data.ids.forEach(function(id) {
        console.log('sending message to ' + id);
        twitterBot.post('direct_messages/new', 
          { 
            'text': message,
            'user_id': id
          }, function(err, data, res) {
            if(err) {
              console.log(err);
              console.log('errr');
            }
 
        });
      });
    }
  });
}, 70000);


module.exports = router;