var Target = require('../models/target');
var async = require('async');
var targetInfoCrawler = require('../crawlers/targetInfoCrawler');

module.exports = function(io){

	io.sockets.on('connection', function (socket) {
		
		console.log("client connected!");

		//start crawling
		socket.on('start crawler', function(data){
			if(data.type == 'all'){
				Target.getAll(function(err, results){
					if(err){
						console.log(err);
					}else if(results){

					}
				});
			}
		});

		//update target info
		socket.on('update target', function(data){
			console.log("update target info!");
			if (data.type == 'all') {
				Target.getAll(function(err, results){
					if(err){
						console.log(err);
					}else if(results){
						async.eachSeries(results, function(t, callback){
							targetInfoCrawler.start(t, callback);
							
						}, function(err){	
							if(err){
								console.log(err);
							}
						});
					}
				});
			}
		});
	});

};