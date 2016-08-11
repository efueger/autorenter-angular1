'use strict';

var angular = require('angular');
var loggingApi = require('./logging/loggingApi');
var appConfig = require('../config/app.config');

module.exports = angular.module('app.common', [loggingApi.name, appConfig.name]);
