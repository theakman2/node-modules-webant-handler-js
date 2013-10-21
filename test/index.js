var Handler = require("../lib/index.js");
var HandlerBase = require("./lib/Handler.js");

function createHandler(Handler,settings) {
	var handlerBase = new HandlerBase(settings);
	
	Handler.prototype = handlerBase;
	Handler.prototype.constructor = Handler;
	
	return new Handler();
}

var uglify = require("uglify-js");

var tests = {
		"test js 1":function(assert,done) {
			var handler = createHandler(Handler);
			var data = {
				filePath:"https://sfi9s.sdf.sd/vk93k.handlebars?bla=3",
				raw:"https://sfi9s.sdf.sd/vk93k.handlebars?bla=3",
				requireType:"comment"
			};
			handler.willHandle(data,function(err,yes){
				assert.strictEqual(err,null,"Handler should not report any errors.");
				assert.strictEqual(yes,false,"Handler should not claim to handle this file.");
				done();
			});
		},
		"test js 2":function(assert,done) {
			var handler = createHandler(Handler);
			var data = {
				filePath:__dirname+"/path/to/bad/file.json",
				raw:"file.json",
				requireType:"function"
			};
			handler.willHandle(data,function(err,yes){
				assert.strictEqual(err,null,"Handler should not report any errors.");
				assert.strictEqual(yes,false,"Handler should not claim to handle this file.");
				done();
			});
		},
		"test js correct file type normal":function(assert,done) {
			var handler = createHandler(Handler);
			
			var payload = {
				requireType:"function",
				filePath:__dirname+"/script.js",
				raw:"./script.js"
			};
			
			handler.handle(payload,function(resp){
				assert.deepEqual(
					resp,
					{
						content:"var pi = 3.14; function foo() {}; function bar() { alert('b'); }; bar();",
						type:"internalJs"
					},
					"Handler should call 'update' correctly."
				);
				
				done();
			});
		},
		"test js correct file type compress":function(assert,done) {
			var handler = createHandler(Handler,{mode:'compress'});
			
			var payload = {
				requireType:"function",
				filePath:__dirname+"/script.js",
				raw:"./script.js"
			};
			
			handler.handle(payload,function(resp){
				assert.strictEqual(
					resp.hasOwnProperty("content"),
					true,
					"Handler should call 'update' correctly (1)."
				);
				
				assert.strictEqual(
					resp.type,
					"internalJs",
					"Handler should call 'update' correctly (2)."
				);
				
				assert.strictEqual(
					resp.content.length < 72,
					true,
					"Handler should call 'update' correctly (3)."
				);
				
				done();
			});
		},
		"test js correct file type debug":function(assert,done) {
			var handler = createHandler(Handler,{mode:'debug',debugBasePath:__dirname});
			
			var payload = {
				requireType:"function",
				filePath:__dirname+"/script.js",
				raw:"./script.js"
			};
			
			handler.handle(payload,function(resp){
				assert.strictEqual(
					resp.hasOwnProperty("content"),
					true,
					"Handler should call 'update' correctly (1)."
				);
				
				assert.strictEqual(
					resp.type,
					"internalJs",
					"Handler should call 'update' correctly (2)."
				);
				
				assert.strictEqual(
					resp.content.indexOf("/*script.js: 1*/") === 0,
					true,
					"Handler should call 'update' correctly (3)."
				);
				
				done();
			});
		}
};

require("test").run(tests);