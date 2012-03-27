var oauth = require('oauth')

module.exports = new oauth.OAuth(
  "https://twitter.com/oauth/request_token", 
  "https://twitter.com/oauth/access_token", 
  process.env.TWITTER_CONSUMER_KEY, 
  process.env.TWITTER_CONSUMER_SECRET, 
  "1.0A", 
  process.env.TWITTER_CALLBACK,
  "HMAC-SHA1")