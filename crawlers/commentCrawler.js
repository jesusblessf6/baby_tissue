exports.start = function(item, outercallback){
	var async = require('async');
	var webdriver = require('selenium-webdriver');
	var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
	//console.log(item);
	var moment = require('moment');
	var Comment = require('../models/comment');
	driver.manage().window().maximize();

	if(item.type == 'tmall'){
		// async.series([
		// 	function(callback){
		// 		driver.get(item.shopUrl).then(callback);
		// 	}, 

		// 	function(callback){
		// 		driver.get(item.url).then(callback);
		// 	},

		// 	function(callback){
		// 		driver.get(item.url + "#bd").then(function(){
		// 			setTimeout(callback, 2000);
		// 		});
		// 	},

		// 	function(callback){
		// 		driver.get(item.url + "#J_TabBar").then(function(){
		// 			setTimeout(callback, 2000);
		// 		});
		// 	},

		// 	function(callback){
		// 		driver.findElement({id : "J_TabBar"}).then(function(tabBarDiv){
		// 			tabBarDiv.findElement({partialLinkText : "累计评价"}).then(function(commentLink){
		// 				commentLink.click();
		// 			});
		// 		}).then(function(){
		// 			setTimeout(callback, 3000);
		// 		});
		// 	},

		// 	function(callback){
		// 		driver.get(item.url + "#J_Reviews").then(function(){
		// 			setTimeout(callback, 3000);
		// 		});
		// 	},

		// 	function(callback){

		// 		driver.findElement({id : 'J_Reviews'}).then(function(revDiv){
		// 			revDiv.findElement({className : "tm-rate"}).then(function(rateDiv){
		// 				rateDiv.findElement({className : "rate-toolbar"}).then(function(rateToolbarDiv){
		// 					rateToolbarDiv.findElement({name : "content"}).then(function(ch){
		// 						ch.click();
		// 					});
		// 				});
		// 			});
		// 		}).then(function(){
		// 			setTimeout(callback, 3000);
		// 		});
		// 	},

		// 	function(callback){
		// 		var flag = true;
		// 		async.whilst(function(){
		// 			return flag;
		// 		}, function(callback){
		// 			async.series([
		// 				function(callback){
		// 					//get the comments from page
		// 					driver.findElement({className : "rate-grid"}).then(function(rateGrid){
		// 						rateGrid.findElements({tagName : "tr"}).then(function(trs){
		// 							async.eachSeries(trs, function(tr, callback){
		// 								var tmpcomment = {tid : item.tid};
		// 								async.series([
		// 									function(callback){
		// 										//get the comment content
		// 										tr.findElement({className : "tm-rate-fulltxt"}).then(function(fulltext){
													
		// 											fulltext.getText().then(function(x){
		// 												tmpcomment.content = x;
		// 											});
		// 										}).then(callback);
		// 									},

		// 									function(callback){
		// 										//get the comment time
		// 										tr.findElement({className : "tm-rate-date"}).then(function(cdate){
		// 											cdate.getText().then(function(cdt){
		// 												var today = new Date();
		// 												var today_year = today.getYear();
		// 												var today_month = today.getMonth();
		// 												var today_day = today.getDay();
		// 												today.setHours(0);
		// 												today.setMinutes(0);
		// 												today.setSeconds(0);
		// 												today.setMilliseconds(0);
		// 												if(cdt == '今天'){	
		// 													tmpcomment.publishDate = today;
		// 												}else{
		// 													tmpcomment.publishDate = moment(today_year.toString() + "."+cdt, "YYYY.MM.DD");
		// 												}
		// 											});
		// 										}).then(callback);
		// 									},

		// 									function(callback){
		// 										//sku info
		// 										tr.findElement({className : 'rate-sku'}).then(function(rateSku){
		// 											rateSku.getText().then(function(rst){
		// 												tmpcomment.spec = rst;
		// 											});
		// 										}).then(callback);
		// 									},

		// 									function(callback){
		// 										//customer info
		// 										tr.findElement({className : "rate-user-info"}).then(function(cusEle){
		// 											cusEle.isElementPresent({tagName : 'a'}).then(function(p){
		// 												if(p){
		// 													cusEle.findElement({tagName : 'a'}).then(function(cuslink){
		// 														cuslink.getAttribute("href").then(function(h){
		// 															tmpcomment.cusLink = h;
		// 														}).then(function(){
		// 															cuslink.getText().then(function(x){
		// 																tmpcomment.cusName = x;
		// 															});
		// 														});
		// 													}).then(function(){
		// 														tmpcomment.isAnonymous = false;
		// 													});
		// 												}else{
		// 													cusEle.getText().then(function(x){
		// 														tmpcomment.cusName = x;
		// 													}).then(function(){tmpcomment.isAnonymous = true;});
		// 												}
		// 											});
		// 										}).then(callback);
		// 									},

		// 									function(callback){
		// 										//save the comment
		// 										var c = new Comment(tmpcomment);
		// 										c.save(function(err, result){
		// 											if(err){
		// 												console.log(err);
		// 											}
		// 											callback();
		// 										});
		// 									}
		// 								], function(err){
		// 									if(err){
		// 										console.log(err);
		// 									}
		// 									callback();
		// 								});
		// 							}, function(err){
		// 								if(err){
		// 									console.log(err);
		// 								}
		// 							});
		// 						});
		// 					}).then(callback);
		// 				},

		// 				function(callback){
		// 					//check if there is the next page link
		// 					//if true, then click the next page link
		// 					//else set the fla to false
		// 					driver.findElement({className : 'rate-paginator'}).then(function(pagefooter){
		// 						pagefooter.isElementPresent({partialLinkText : '下一页'}).then(function(p){
		// 							if(p){
		// 								pagefooter.findElement({partialLinkText : '下一页'}).then(function(nextpage){
		// 									nextpage.click();
		// 								});
		// 							}else{
		// 								flag = false;
		// 							}
		// 						});
		// 					}).then(function(){
		// 						setTimeout(callback, 3000);
		// 					});
		// 				}
		// 			], function(err){
		// 				if(err){
		// 					console.log(err);
		// 				}
		// 				callback();
		// 			});
		// 		}, function(err){
		// 			if(err){
		// 				console.log(err);
		// 			}
		// 			callback();
		// 		});
				
		// 	},

		// 	function(callback){
		// 		callback();
		// 	}
		// ], function(err){
		// 	if(err){
		// 		console.log(err);
		// 	}
			
		// 	driver.close();
		// 	driver.quit();
		// 	driver = null;
		// 	outercallback();
		// });
	}else{
		async.series([
			function(callback){
				driver.get(item.shopUrl).then(callback);
			}, 

			function(callback){
				driver.get(item.url).then(callback);
			},

			function(callback){
				driver.get(item.url + "#bd").then(callback);
			},

			function(callback){
				driver.get(item.url + "#J_TabBarWrap").then(callback);
			},

			function(callback){
				driver.findElement({id : "J_TabBarWrap"}).then(function(tabbar){
					tabbar.findElement({partialLinkText : "评价详情"}).then(function(cl){
						cl.click();
					});
				}).then(function(){
					setTimeout(callback, 3000);
				});
			},

			function(callback){
				driver.findElement({id : "review-cb-hascnt"}).then(function(cb){
					cb.click();
				}).then(function(){
					setTimeout(callback, 3000);
				});
			},

			function(callback){
				var flag = true;

				async.whilst(
					function(){return flag;},
					function(callback){
						async.series([
							function(callback){
								driver.findElement({className : "tb-r-comments"}).then(function(cs){
									cs.findElements({tagName : "li"}).then(function(cslis){
										async.eachSeries(cslis, function(csli, callback){
											
										}, function(err){
											if(err){
												console.log(err);
											}

										});
									});
								}).then(callback);
							},

							function(callback){
								//next page
								callback();
							}
						], function(err){
							if(err){
								console.log(err);
							}
							callback();
						});
					},
					function(err){
						if(err){
							console.log(err);
						}
						callback();
					}
				);
				// driver.findElement({className : "tb-r-comments"}).then(function(cs){

				// }).then(callback);
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