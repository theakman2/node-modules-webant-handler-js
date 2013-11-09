# node-modules-webant-handler-js

_Require javascript files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

There should be no need to install this module since it's required by the [webant](https://github.com/theakman2/node-modules-webant) module by default.

If for some reason you'd like to use the module outside of webant, install as follows:

    $ npm install webant-handler-js

## Usage

Ensure the `js` handler is present in your webant configuration file. For example:

````json
{
    "entry":"src/js/main.js",
    "dest":"build/main.js",
    "handlers":{
        "js":{}
    }
}
````

You may now `require` javascript files:

````javascript
var foo = require("../lib/foo.js");
foo.sayHello();
````

## Tests

    $ npm test