'use strict';

var errorHandling = require('./error-handling.module');

errorHandling
  .factory('$exceptionHandler', ['$injector', function factoryImpl($injector) {
    return function myExceptionHandler(exception) {
      var notificationService = $injector.get('notificationService'); // Needed to get around circular dependency...
      notificationService.notifyError({
        technicalMessage: exception.toString()
      });
    };
  }]);
