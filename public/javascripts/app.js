var socket = io.connect()

socket.on('booky', function (data) {
  $('ul').prepend('<li><a href="' + data.href +'">' + data.title.replace('<', '&lt;') + '</a></li>')
});

$(function() {
  $('form').submit(function() {

    $('button').attr('disabled', true);

    var href = $('#href').val(),
        title = $('#title').val()

    $.post('/bookies', { 
      'booky[href]' : href,
      'booky[title]': title
      }, function(data) {
        data = JSON.parse(data)

        if(typeof data.error != 'undefined') {
          $('p.alert').html(data.error.message).fadeIn()
        } else {
          $('#href').val('')
          $('#title').val('')
        }

        $('button').attr('disabled', false);
    })

    return false
  })
})