# node-modules-webant-handler-js

_Require javascript files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

There should be no need to install this module since it's required by the [webant](https://github.com/theakman2/node-modules-webant) module by default.

If for some reason you'd like to use the module outside of webant, install as follows:

    $ npm install webant-handler-js

## Usage

Ensure the `js` handler is present in your webant configuration file.

An example configuration file which uses this handler may look like this:

````json
{
    "jsEntryPath":"%%base%%/src/js/main.js",
    "jsDestPath":"%%base%%/build/main.js",
    "handlers":{
        "js":{}
    }
}
````

You may now `require` javascript files via the function style:

````javascript
var foo = require("../lib/foo.js");
foo.sayHello();
````

## Settings

The following configuration settings are available:

`mode`

Can be either `normal` (default), `compress` or `debug`. Setting to `compress` will use Uglify-JS to compress each required javascript file. Setting to `debug` will output the filepath and line number of each line for debugging purposes, relative to the `debugBasePath` setting.

`debugBasePath`

A path that filepaths are relative to if `mode` is set to `debug`. 

## Tests

    $ npm test