/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fs = require('fs');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
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

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

Array.prototype.save = function() {
  var s = JSON.stringify(this)
  fs.writeFile('bookies.json', s, console.log)
}


var loadBookies =  function() {
  fs.readFile('bookies.json', function(err, data) {
    if(!err) {
      bookies = JSON.parse(data)
    }
  })
}

bookies = [], user = []
loadBookies()

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
      data.date = new Date()
      bookies.push(data)
      bookies.save()
      for(var i = 0; i < user.length; i++) {
        user[i].emit('booky', data)
      }
    }
  })
});
