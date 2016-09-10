'use strict';

var errorHandling = require('./error-handling.module');

var httpErrorHandlerFactory = function httpErrorHandlerFactory($q, notificationService) {
  return {
    responseError: function(response) {
      console.log('response.status = ' + response.status);
      notificationService.notifyError({
        userMessage: 'Oops, an error!',
        technicalMessage: 'oops! status = ' + response.status
      });

      return $q.reject(response);
    }
  };
};

httpErrorHandlerFactory.$inject = ['$q', 'notificationService'];

errorHandling
  .factory('httpErrorHandlerFactory', httpErrorHandlerFactory);
