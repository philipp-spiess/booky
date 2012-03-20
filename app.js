/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

bookies = [], user = []

String.prototype.isUrl = function() {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(this)
}

io.sockets.on('connection', function (socket) {
  user.push(socket);
  socket.on('disconnect', function(socket) {
    var index = user.indexOf(socket)
    user.splice(index, 1)
  })

  socket.on('booky', function (data) {
    if(data.href.isUrl() && data.title.length > 0) {
      bookies.push(data)
      for(var i = 0; i < user.length; i++) {
        user[i].emit('booky', data)
      }
    }
  })
});
