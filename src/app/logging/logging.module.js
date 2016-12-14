'use strict';

var angular = require('angular');
var config = require('../config/config');
var strings = require('../imports/strings.import.js');

module.exports = angular.module('fa.logging', [config.name, strings.name]);
