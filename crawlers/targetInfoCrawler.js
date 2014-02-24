

exports.start = function(target, outercallback){
	var async = require('async');
	var webdriver = require('selenium-webdriver');
	var urlParser = require('url');
	var parsedUrl;
	var Target = require('../models/target');
	var tt = {};
	var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

	async.series([
		function(callback){
			parsedUrl = urlParser.parse(target.url, true);
			//console.log(parsedUrl);
			console.log(target.url);
			tt.tid = parsedUrl.query.id;
			tt.url = target.url;
			var host = parsedUrl.hostname;
			if(host.indexOf('tmall') >=0){
				tt.type = 'tmall';
			}else{
				tt.type = 'taobao';
			}
			callback();
		},

		function(callback){
			
			driver.get(target.shopUrl);
			driver.get(target.url);
			driver.findElement({className : 'tb-detail-hd'}).then(function(e){
				e.getText().then(function(text){
					tt.title = text;
				});
			}).then(callback);
		},

		function(callback){
			var tmpTarget = new Target(tt);
			tmpTarget.save(function(err, result){
				if(err){
					console.log(err);
				}
				callback();
			});
		}

	], function(err){
		driver.close();
		driver.quit();
		driver = null;
		outercallback();
	});
	
};