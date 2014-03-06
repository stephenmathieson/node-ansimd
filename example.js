
var fs = require('fs');
var read = fs.readFileSync;
var render = require('./');

var str = read('./Readme.md');
console.log(render(str));
