/*
 * GET home page.
 */

var consumer = require('../lib/twitter')

exports.index = function(req, res) {
  Booky.find()
       .sort('date', -1)
       .execFind(function(err, docs) {

    name = req.session.name
    bookies = docs

    res.render('index', { title: 'Booky' })
  })
}

exports.bookies = function(req, res) {
  Booky.find()
       .sort('date', -1)
       .execFind(function(err, docs) {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(docs))
  })
}

exports.connect = require('./connect')

exports.callback = require('./callback')

exports.bookiesPost = function(req, res) {
  try {
    booky = new Booky({
      title: req.body.booky.title,
      href: req.body.booky.href
    })

    booky.save(function(err) {
      if(err) {
        res.send(JSON.stringify({error:err}))
      } else {
        res.send(JSON.stringify({success:booky}))
        socket.broadcast('booky', booky)
      }
    })
  } catch(e) {
    res.send(JSON.stringify({error:e}))
  }
}