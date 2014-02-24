var conn = require('./db').conn;

function Comment(comment){
	this.content = comment.content;
	this.cusName = comment.cusName;
	this.publishDate = comment.publishDate;
	this.spec = comment.spec;
	this.cusLink = comment.cusLink;
	this.isAnonymous = comment.isAnonymous;
};

module.exports = Comment;

Comment.prototype.save = function(callback){
	var tc = {
		content : this.content,
		cusName : this.cusName,
		publishDate : this.publishDate,
		spec : this.spec,
		cusLink : this.cusLink,
		isAnonymous : this.isAnonymous
	};

	conn.collection('comments').count({content : tc.content, publishDate : tc.publishDate, cusName : tc.cusName}, function(err, c){
		if(err){
			return callback(err);
		}

		if(c <= 0){
			conn.collection('comments').insert(tc, function(err, result){
				if(err){
					return callback(err);
				}else{
					callback(null, result);
				}
			});
		}
	});
};