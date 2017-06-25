const Twit = require('twit');

module.exports = new Twit({
  consumer_key: process.env.TWITTERCONSUMERKEY,
  consumer_secret: process.env.TWITTERCONSUMERSECRET,
  access_token: process.env.BOTACCESSTOKEN,
  access_token_secret: process.env.BOTACCESSTOKENSECRET
});
