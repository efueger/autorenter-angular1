'use strict';

var logging = require('./logging.module');

function provide($provide, logApiProvider, logDecorator) {
  var logDecoratorShim = function logDecoratorShim($delegate) {
    return logDecorator.decorateLogService($delegate, logApiProvider);
  };
  $provide.decorator('$log', [
    '$delegate', logDecoratorShim
  ]);
}

provide.$inject = ['$provide', 'logApiProvider', 'logDecorator'];

logging.config(provide);
