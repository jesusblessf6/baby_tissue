var conn = require('./db').conn;

function Comment(comment){
	this.tid = comment.tid;
	this.content = comment.content;
	this.cusName = comment.cusName;
	this.publishDate = comment.publishDate;
	this.spec = comment.spec;
	this.cusLink = comment.cusLink;
	this.isAnonymous = comment.isAnonymous;
	this.cusRateLink = comment.cusRateLink;
	this.cusTid = comment.cusTid;
};

module.exports = Comment;

Comment.prototype.save = function(callback){
	var tc = {
		content : this.content,
		cusName : this.cusName,
		publishDate : this.publishDate,
		spec : this.spec,
		cusLink : this.cusLink,
		isAnonymous : this.isAnonymous,
		tid : this.tid,
		cusRateLink : this.cusRateLink,
		cusTid : this.cusTid
	};

	conn.collection('comments').count({tid : tc.tid , content : tc.content, publishDate : tc.publishDate, cusName : tc.cusName, spec : tc.spec}, function(err, c){
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