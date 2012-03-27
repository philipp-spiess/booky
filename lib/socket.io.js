module.exports = function(io) {
  var sockets = []

  io.sockets.on('connection', function (socket) {
    sockets.push(socket);
    socket.on('disconnect', function(socket) {
      sockets = _.without(sockets, socket)
    })

    socket.on('booky', function (data) {

      booky = new Booky({
        title: data.title,
        href: data.href
      })

      booky.save()

      _.each(sockets, function(socket) {
        socket.emit('booky', booky)
      })
    
    })
  });
}