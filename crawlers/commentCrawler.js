exports.start = function(item, outercallback){
	var async = require('async');
	var webdriver = require('selenium-webdriver');
	var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

	if(item.type == 'tmall'){
		async.series([
			function(callback){
				driver.get(item.shopUrl).then(callback);
			}, 

			function(callback){
				driver.get(item.url).then(setTimeout(callback, 10000));
			},

			function(callback){
				callback();
			}
		], function(err){
			if(err){
				console.log(err);
			}
			
			driver.close();
			driver.quit();
			driver = null;
			outercallback();
		});
	}else{
		async.series([
			function(callback){
				driver.get(item.shopUrl).then(callback);
				//callback();
			}, 

			function(callback){
				driver.get(item.url).then(callback);
			},

			function(callback){
				callback();
			}
		], function(err){
			if(err){
				console.log(err);
			}
			driver.close();
			driver.quit();
			driver = null;
			outercallback();
		});
		
	}

	
};