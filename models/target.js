var conn = require('./db').conn;

function Target(target){
	this.url = target.url;
	this.title = target.title;
	this.type = target.type;
	this.tid = target.tid;
};

module.exports = Target;

Target.prototype.save = function(callback){
	var tt = {
		tid : this.tid,
		url : this.url,
		type : this.type,
		title : this.title
	};

	conn.collection('targets').count({url : tt.url}, function(err, c){
		if(err){
			return callback(err);
		}

		if(c > 0){
			conn.collection('targets').update({url : tt.url}, {$set : {title : tt.title, tid : tt.tid, type :tt.type}}, function(err, result){
				if(err){
					callback(err);
				}else{
					callback(null, result);
				}

			});
		}else{
			conn.collection('targets').insert(tt, function(err, result){
				if(err){
					callback(err);
				}else{
					callback(null, result);
				}
			});
		}
	});
};

Target.getAll = function(callback){

	conn.collection('targets').find().toArray(function(err, results){
		if(err){
			return callback(err);
		}else if(results){
			callback(null, results);
		}		
	});

};