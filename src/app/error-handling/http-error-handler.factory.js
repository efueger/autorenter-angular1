'use strict';

var errorHandling = require('./error-handling.module');

var httpErrorHandlerFactory = function httpErrorHandlerFactory($q, notificationService) {
  var getResponseNotificationMessage = function getResponseNotificationMessage(errorCode, data) {
    if (errorCode === 400) {
      return {
        title: 'Validation error',
        userMessage: data.message,
        noLog: true
      };
    }

    if (errorCode === 413) {
      return {
        userMessage: 'The upload could not be processed because it is too large for the system to handle.'
          + ' Please contact technical support.'
      };
    }

    if (errorCode >= 500 && errorCode < 600) {
      return {
        userMessage: 'The server is unavailable. Please try again.'
          + ' If the problem persists, please notify technical support.',
        noLog: true
      };
    }

    if (errorCode === 404) {
      return {
        title: 'Document not found',
        userMessage: 'The data you are requesting does not exist.'
      };
    }

    if (errorCode === 401 || errorCode === 403) {
      // Handled by authorization module
      return null;
    }

    return {
      title: 'General response error'
    };
  };

  return {
    responseError: function handleResponseError(response) {
      var notificationData = getResponseNotificationMessage(response.status, response.data);
      if (notificationData) {
        notificationService.notifyError(notificationData);
      }
      return $q.reject(response);
    }
  };
};

httpErrorHandlerFactory.$inject = ['$q', 'notificationService'];

errorHandling
  .factory('httpErrorHandler', httpErrorHandlerFactory);
