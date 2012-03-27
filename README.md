# Booky #

Booky is a light, real-time bookmark-service. It's designed to share your bookmarks online and collaborate with your friends.

It uses Twitter to authorize users and MongoDB to store the data. You can deploy it onto heroku for free.

## Demo ##

Feel free to try it out on [Heroku](https://booky.herokuapp.com). 

And don't forget to look at the screenshot.

![Booky](http://dl.dropbox.com/u/16019885/booky.PNG)
(Sorry, the next screenshot will be done on a Mac!)

## Run Local ##

First of all, make sure node.js and npm is installed and you have created a Twitter app.

    $ git clone git@github.com:philipp-spiess/booky.git
    $ cd booky
    $ npm install
    $ export MONGOHQ_URL=mongodb://localhost/db
    $ export TWITTER_CONSUMER_KEY=key
    $ export TWITTER_CONSUMER_SECRET=secret
    $ export TWITTER_CALLBACK=http://localhost:3000/callback
    $ node web

## Deploy onto Heroku ##

If you want to make it public, Heroku is the right solution. Please make sure you create a verified account first.

    $ git clone git@github.com:philipp-spiess/booky.git
    $ cd booky
    $ heroku create --stack cedar
    $ heroku addons:add mongohq:free
    $ heroku ps:scale web=1
    $ heroku config:add TWITTER_CONSUMER_KEY=key
    $ heroku config:add TWITTER_CONSUMER_SECRET=secret
    $ heroku config:add TWITTER_CALLBACK=http:s//app.herokuapp.com/callback
    $ git push heroku master



    