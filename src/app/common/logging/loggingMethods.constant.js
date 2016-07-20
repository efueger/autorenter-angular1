(function init() {
  'use strict';
  angular.module('app.common').constant('loggingMethods', {
    info: 'info',
    warn: 'warn',
    error: 'error',
    log: 'log',
    debug: 'debug'
  });
})();
