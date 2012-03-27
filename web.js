/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    fs = require('fs'),
    app = module.exports = express.createServer(),
    io = require('socket.io').listen(app),
    socket = require('./lib/socket.io')

mongoose = require('mongoose'),
_ = require('underscore')


// Model
mongoose.connect(process.env.MONGOHQ_URL)
Booky = require('./models/booky')

// Socket.IO
socket(io)

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser())
  app.use(express.session({ secret: process.env.SECRET || 'ultra awesome scret' }));
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
});

app.configure('production', function(){
  app.use(express.errorHandler())
});

// Routes

app.get('/', routes.index)
app.get('/connect', routes.connect)
app.get('/callback', routes.callback)

app.listen(process.env.PORT || 3000)
console.log("Express server listening on port %d in %s mode", process.env.PORT || 3000, app.settings.env)





