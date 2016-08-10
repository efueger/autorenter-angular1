'use strict';

var loggingApi = require('./logging/loggingApi.module');
var appConfig = require('../app.config');

angular.module('app.common', [loggingApi.name, appConfig.name]);
