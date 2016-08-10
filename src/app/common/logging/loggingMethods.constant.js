'use strict';

var loggingApi = require('./loggingApi.module');

loggingApi.constant('loggingMethods', {
  info: 'info',
  warn: 'warn',
  error: 'error',
  log: 'log',
  debug: 'debug'
});
