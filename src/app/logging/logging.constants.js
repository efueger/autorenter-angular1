'use strict';

var loggingModule = require('./logging.module');

loggingModule
  .constant('logDecorator', {
    decorateLogService: function decorateLogService(logService, logApiProvider) {
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
          var original = logService[logLevel];
          logService[logLevel] = function logToApiDecorator() {
            var args = [].slice.call(arguments);
            original.apply(logService, args);
            logToApi(args[messageIndex], logLevel);
          };
        });

        // Special... only needed to support angular-mocks expectations.
        logService.info.logs = logService.info.logs || [];
        logService.warn.logs = logService.warn.logs || [];
        logService.error.logs = logService.error.logs || [];
      }

      decorate();

      return logService;
    }
  });
