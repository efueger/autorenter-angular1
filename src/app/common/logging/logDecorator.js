(function init() {
  'use strict';

  angular
    .module('app.common', [])
    .config([
      '$provide', '$windowProvider', 'generalConfig',
      function provide($provide, $windowProvider, generalConfig) {
        var logDecorator = function $logDecorator($delegate) {
          function logToApi(message, severity) {
            // Do NOT use $http in the context of logging because it creates a circular dependency, initiates the digest
            // loop, and makes logging to the API impossible if Angular itself if hosed.
            var READY_STATE = 4;
            var SUCCESS_CODE = 201;
            var payload = {
              message: message,
              level: severity,
              username: 'bill'
            };
            var xhr = new XMLHttpRequest();
            xhr.open('POST', generalConfig.apiUrl + 'api/log');
            xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            xhr.onreadystatechange = function onReadyStateChange() {
              if (xhr.readyState === READY_STATE && xhr.status !== SUCCESS_CODE) {
                var errorMessageFormat =
                  'A logging error has occurred: readyState = \'{state}\', statusCode = \'{status}\'.';
                var strings = $windowProvider.$get().strings;
                var errorMessage = strings.format(errorMessageFormat, {
                  state: xhr.readyState,
                  status: xhr.status
                });
                throw new Error(errorMessage);
              }
            };
            xhr.send(JSON.stringify(payload));
          }

          function decorate() {
            var messageIndex = 0;
            var loggingMethods = ['info', 'warn', 'error'];

            loggingMethods.forEach(function decorateLogging(logLevel) {
              var original = $delegate[logLevel];
              $delegate[logLevel] = function decoratedLogFxn() {
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
    ]);
}());
