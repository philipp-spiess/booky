
/*
 * GET home page.
 */

exports.index = function(req, res) {
  Booky.find({}, function(err, docs) {
    bookies = docs
    res.render('index', { title: 'Booky' })
  })
}



exports.connect = function(req, res) {
  consumer().getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + sys.inspect(error), 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
}