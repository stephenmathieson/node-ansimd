#!/usr/bin/env node

var ansimd = require('./')
var fs = require('fs')

var args = process.argv.slice(2)
if (!args[0]) {
  console.error('Usage: ansimd <md-file>')
  process.exit(1)
}

var file = fs.readFileSync(args[0])

console.log(ansimd(file.toString()))
