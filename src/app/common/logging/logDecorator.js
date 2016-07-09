(function init() {
  'use strict';

  angular
    .module('app.common', [])
    .config([
      '$provide',
      function provide($provide) {
        $provide.decorator('$log', [
          '$delegate',
          function $logDecorator($delegate) {
            // console.log('decorating the warn function...');
            var originalWarn = $delegate.warn;
            $delegate.warn = function decoratedWarn() {
              var args = [].slice.call(arguments);
              args[0] = 'decorated! ' + args[0];
              // console.info('args = ' + JSON.stringify(args));
              originalWarn.apply($delegate, args);
            };

            // Special... only needed to support angular-mocks expectations.
            $delegate.warn.logs = $delegate.warn.logs || [];

            // TODO...
            // function logToApi(message, severity) {
              // Do NOT use $http because it creates a circular dependency, initiates the digest loop,
              // and makes logging to the API impossible if Angular itself if hosed.
              // var READY_STATE = 4;
              // var SUCCESS_CODE = 200;
              // var payload = angular.toJson({
              //  message: message,
              //  severity: severity
              // });
              // var xhr = $xhrFactory('POST', 'api/log');
              // xhr.open('POST', 'api/log', true);
              // xhr.setRequestHeader('Content-Type', 'application/json');
              // xhr.onreadystatechange = function onReadyStateChange() {
              //  if (xhr.readyState === READY_STATE && xhr.status !== SUCCESS_CODE) {
              //    console.log('oops!');
              //    throw new Error('A logging error has occurred.');
              //  }
              // };
              // xhr.send(JSON.stringify(payload));
            // }

            return $delegate;
          }
        ]);
      }
    ]);
}());
