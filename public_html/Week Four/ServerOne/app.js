var express = require('express')
var app = express()
var handlebars = require('hbs')

var randNum = require('./modules/random_number.js')
console.log(randNum.rand)
console.log(randNum.something)