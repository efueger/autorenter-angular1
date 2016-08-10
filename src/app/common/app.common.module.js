'use strict';

var angular = require('angular');
var loggingApi = require('./logging/loggingApi.module');
var appConfig = require('../app.config');

module.exports = angular.module('app.common', [loggingApi.name, appConfig.name]);
