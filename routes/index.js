/*
 * GET home page.
 */

var oauth = require('oauth'),
    consumer = new oauth.OAuth(
      "https://twitter.com/oauth/request_token", 
      "https://twitter.com/oauth/access_token", 
      process.env.TWITTER_CONSUMER_KEY, 
      process.env.TWITTER_CONSUMER_SECRET, 
      "1.0A", 
      process.env.TWITTER_CALLBACK,
      "HMAC-SHA1")

exports.index = function(req, res) {
  Booky.find()
       .sort('date', -1)
       .execFind(function(err, docs) {

    name = req.session.name
    bookies = docs

    res.render('index', { title: 'Booky' })
  })
}

exports.connect = function(req, res) {
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token", 500);
      console.log(error)
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
}

exports.callback = function(req, res) {
  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token")
      console.log(error)
    } else {
      req.session.oauthAccessToken = oauthAccessToken
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret
      
       consumer.get("http://twitter.com/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
          res.send("Error getting Twitter Username")
          console.log(error)
        } else {
          var parsedData = JSON.parse(data)
          req.session.name = parsedData.screen_name
          res.redirect("/")
        } 
      });
    }
  });
}