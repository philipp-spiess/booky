var socket = io.connect()

socket.on('booky', function (data) {
  $('ul').prepend('<li><a href="' + data.href +'">' + data.title + '</a></li>')
});

String.prototype.isUrl = function() {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(this)
}

$(function(){
  $('form').submit(function() {
    var href = $('#href').val(),
        title = $('#title').val()

    if(href.isUrl() && title.length > 0) {
      $('p.alert').fadeOut()    
      socket.emit('booky', {href : href, title: title })
    } else {
      $('p.alert').fadeIn()
    }

    return false
  })
})