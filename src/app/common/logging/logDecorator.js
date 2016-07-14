(function init() {
  'use strict';

  angular
    .module('app.common', [])
    .config([
      '$provide', '$windowProvider',
      function provide($provide, $windowProvider) {
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
            xhr.open('POST', 'http://192.168.99.100:3000/api/log');
            xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            xhr.onreadystatechange = function onReadyStateChange() {
              if (xhr.readyState === READY_STATE && xhr.status !== SUCCESS_CODE) {
                var errorMessageFormat =
                  'A logging error has occurred: readyState = \'{state}\', statusCode = \'{status}\'.';
                var string = $windowProvider.$get().strings;
                var errorMessage = string.format(errorMessageFormat, {
                  state: xhr.readyState,
                  status: xhr.status
                });
                throw new Error(errorMessage);
              }
            };
            xhr.send(JSON.stringify(payload));
          }
          var originalWarn = $delegate.warn;
          $delegate.warn = function decoratedWarn() {
            var args = [].slice.call(arguments);
            args[0] = 'decorated! ' + args[0];
            originalWarn.apply($delegate, args);
            logToApi(args[0], 'warn');
          };

          // Special... only needed to support angular-mocks expectations.
          $delegate.warn.logs = $delegate.warn.logs || [];

          return $delegate;
        };
        $provide.decorator('$log', [
          '$delegate', logDecorator
        ]);
      }
    ]);
}());
