'use strict';

var angular = require('angular');
var appConfig = require('../config/app.config');

module.exports = angular.module('students', [appConfig.name]);
