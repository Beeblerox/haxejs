// Generated by Haxe 3.3.0 (git build development @ 297c528)
(function () { "use strict";
var Main01 = function() {
	console.log("js.Promise example 01");
	window.console.log("1");
	new Promise(function(fulfill,reject) {
		var n = Math.floor(Math.random() * 6) + 1;
		if(n == 6) {
			fulfill(n);
		} else {
			reject(n);
		}
		window.console.log("2");
	}).then(function(toss) {
		window.console.log("Yay, threw a " + toss + ".");
	},function(toss1) {
		window.console.log("Oh, noes, threw a " + toss1 + ".");
	});
	window.console.log("3");
};
Main01.main = function() {
	new Main01();
};
Main01.main();
})();
