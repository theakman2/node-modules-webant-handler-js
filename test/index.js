var handler = require("../lib/index.js");

var tests = {
	"test filetypes":function(assert) {
		var data = [
		            "https://mysite.co.uk/bla.js",
		            "//cdn.google.com/path/to/assets.css",
		            "path/to/assets.js",
		            "/abs/path/to/assets.js",
		            "@@hbs/runtime",
		            "@@css/addStylesheet"
		            ];
		assert.deepEqual(
			data.map(function(fp){ return handler.willHandle(fp);}),
			[false,false,true,true,false,false],
			"Should handle the correct files."
		);
	},
	"test content":function(assert,done) {		
		handler.handle(__dirname+"/script.js",{},function(err,content){
			assert.ok(!err,"There should be no errors handling this file.");
			assert.equal(
				content,
				"var pi = 3.14; function foo() {}; function bar() { alert('b'); }; bar();",
				"Handler should return the correct content."
			);
			
			done();
		});
	}
};

require("test").run(tests);