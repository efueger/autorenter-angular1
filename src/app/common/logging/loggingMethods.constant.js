'use strict';

var angular = require('angular');

angular.module('loggingApi').constant('loggingMethods', {
  info: 'info',
  warn: 'warn',
  error: 'error',
  log: 'log',
  debug: 'debug'
});
