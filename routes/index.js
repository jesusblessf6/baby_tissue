
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

module.exports = function(app){
	//app.get('/', routes.index);
	app.get('/', function(req, res){
		res.render('index', {title : '首页'});
	});

	app.get('/comments', function(req, res){
		var Comment = require('../models/comment');
		Comment.getAllComments(function(err, results){
			if(err){console.log(err)}
			else{
				res.render('commentsList', {title : '评论', results : results});
			}
		});
		
	})
};
