(function init() {
  'use strict';

  function provide($provide, loggingApi, loggingMethods) {
    var logDecorator = function $logDecorator($delegate) {
      function decorate() {
        var messageIndex = 0;
        // NOTE: 'log' and 'debug' were deliberately skipped.
        var loggingMethodsToDecorate = [loggingMethods.info, loggingMethods.warn, loggingMethods.error];

        loggingMethodsToDecorate.forEach(function decorateLogging(logLevel) {
          var original = $delegate[logLevel];
          $delegate[logLevel] = function logToApiDecorator() {
            var args = Array.prototype.slice.call(arguments);
            original.apply($delegate, args);
            loggingApi.logToApi(args[messageIndex], logLevel);
          };
        });
      }

      decorate();

      return $delegate;
    };
    $provide.decorator('$log', [
      '$delegate', logDecorator
    ]);
  }

  provide.$inject = ['$provide', 'loggingApi', 'loggingMethods'];

  angular.module('app.common').config(provide);
})();
