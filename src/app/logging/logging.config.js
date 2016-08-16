'use strict';

var logging = require('./logging.module');

function provide($provide, logApiProvider) {
  var logDecorator = function $logDecorator($delegate) {
    function logToApi(message, severity) {
      // Do NOT use $http in the context of logging because it creates a circular dependency, initiates the digest
      // loop, and makes logging to the API impossible if Angular itself if hosed.
      var payload = {
        message: message,
        level: severity,
        username: 'bill'
      };
      logApiProvider.$get().send(JSON.stringify(payload));
    }

    function decorate() {
      var messageIndex = 0;
      var loggingMethods = ['info', 'warn', 'error']; // NOTE: 'log' and 'debug' were deliberately skipped.

      loggingMethods.forEach(function decorateLogging(logLevel) {
        var original = $delegate[logLevel];
        $delegate[logLevel] = function logToApiDecorator() {
          var args = [].slice.call(arguments);
          original.apply($delegate, args);
          logToApi(args[messageIndex], logLevel);
        };
      });

      // Special... only needed to support angular-mocks expectations.
      $delegate.info.logs = $delegate.info.logs || [];
      $delegate.warn.logs = $delegate.warn.logs || [];
      $delegate.error.logs = $delegate.error.logs || [];
    }

    decorate();

    return $delegate;
  };
  $provide.decorator('$log', [
    '$delegate', logDecorator
  ]);
}

provide.$inject = ['$provide', 'logApiProvider'];

logging.config(provide);
