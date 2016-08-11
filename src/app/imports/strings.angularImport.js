'use strict';

var angular = require('angular');
var strings = require('fa-strings.js');

var stringsModule = angular.module('strings', []);
stringsModule.constant('strings', strings);

module.exports = stringsModule;
