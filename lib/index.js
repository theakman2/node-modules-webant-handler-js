/**
 * Handles require calls to files with an extension of .js or with no extension.
 * 
 * Does not handle require calls to external files (e.g. 'http://...').
 */

var path = require("path");

var uglify = require("uglify-js");

module.exports = function() {
	this.extensions = ["",".js"];
	
	this.go = function(data,update,done) {
		var content = data.content;
		var mode = "normal";
		
		if (this.settings && this.settings.mode) {
			if (this.settings.mode === "debug") {
				mode = "debug";
			} else if (this.settings.mode === "compress") {
				mode = "compress";
			}
		}
		
		switch(mode) {
			case "debug":
				var relFilePath;
				if (this.settings.debugBasePath) {
					relFilePath = path.relative(this.settings.debugBasePath,data.filePath);
				} else {
					relFilePath = data.filePath;
				}
				
				var lines = {};
				
				var parsed = uglify.parse(content);
				
				var walker = new uglify.TreeWalker(function(node){
					if (!Array.isArray(node.start.comments_before)) {
						node.start.comments_before = [];
					}
					
					if (!lines.hasOwnProperty(node.start.line)) {
						lines[node.start.line] = true;
						node.start.comments_before.push({
							value:relFilePath+": "+node.start.line,
							type:'comment2'
						});
					}
				});
				
				parsed.walk(walker);
				
				content = parsed.print_to_string({
					comments:true,
					beautify:true,
					bracketize:true
				});
				break;
			case "compress":
				content = uglify.minify(content,{fromString:true}).code;
				break;
		}
		
		update({type:"internalJs",content:content},done);
	};
	
};