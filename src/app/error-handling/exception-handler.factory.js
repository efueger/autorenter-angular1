'use strict';

var errorHandling = require('./error-handling.module');

var exceptionHandlerFactory = function exceptionHandlerFactory($injector) {
  return function myExceptionHandler(exception) {
    var notificationService = $injector.get('notificationService'); // Needed to get around circular dependency...
    notificationService.notifyError({
      technicalMessage: exception.toString()
    });
  };
};

exceptionHandlerFactory.$inject = ['$injector'];

errorHandling
  .factory('$exceptionHandler', exceptionHandlerFactory);
