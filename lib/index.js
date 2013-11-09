var fs = require("fs");
var path = require("path");
var url = require("url");

module.exports = function(settings) {

	this.willHandle = function(filePath) {
		if (url.parse(filePath,false,true).host) {
			return false;
		}
		if (filePath.indexOf("@@") === 0) {
			return false;
		}
		if (path.extname(filePath) !== ".js") {
			return false;
		}
		return true;
	};
	
	this.handle = function(filePath,done) {
		fs.readFile(filePath,function(e,c){
			if (e) {
				done(e);
				return;
			}
			done(null,c.toString());
		});
	}
};