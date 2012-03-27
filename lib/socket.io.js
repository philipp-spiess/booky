
sockets = []

module.exports.connect = function(io) {

  io.sockets.on('connection', function (socket) {
    sockets.push(socket)
    socket.on('disconnect', function(socket) {
      sockets = _.without(sockets, socket)
    })
  })
}

module.exports.broadcast = function(channel, message) {
  _.each(sockets, function(socket) {
    socket.emit(channel, message)
  })
}