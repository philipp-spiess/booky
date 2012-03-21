
/*
 * GET home page.
 */

exports.index = function(req, res){
	bookies.all(function(err, obj) {
		the_bookies = obj
		res.render('index', { title: 'Booky' })
	})
};