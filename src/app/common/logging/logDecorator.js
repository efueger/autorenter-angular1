(function init() {
  'use strict';

  angular
    .module('app.common', [])
    .config([
      '$provide',
      function provide($provide) {
        var logDecorator = function $logDecorator($delegate) {
          console.log('decorating the warn function...');
          function logToApi(message, severity) {
            // Do NOT use $http in the context of logging because it creates a circular dependency, initiates the digest
            // loop, and makes logging to the API impossible if Angular itself if hosed.
            var READY_STATE = 4;
            var SUCCESS_CODE = 200;
            var payload = angular.toJson({
              message: message,
              level: severity,
              username: 'bill'
            });
            var xhr = new XMLHttpRequest(); // $xhrFactory('POST', 'api/log');
            xhr.open('POST', 'http://192.168.99.100:3000/api/log', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function onReadyStateChange() {
              if (xhr.readyState === READY_STATE && xhr.status !== SUCCESS_CODE) {
                console.log('oops, state is ' + xhr.readyState);
                console.log('oops, status is ' + xhr.status);
                throw new Error('A logging error has occurred.');
              }
            };
            xhr.send(JSON.stringify(payload));
          }
          var originalWarn = $delegate.warn;
          $delegate.warn = function decoratedWarn() {
            var args = [].slice.call(arguments);
            args[0] = 'decorated! ' + args[0];
            console.info('args = ' + JSON.stringify(args));
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
