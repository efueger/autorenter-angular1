'use strict';

var errorHandling = require('./error-handling.module');

var httpErrorHandlerFactory = function httpErrorHandlerFactory($q, notificationService) {
  var getNotificationMessage = function getNotificationMessage(errorCode, data) {
    if (errorCode === 400) {
      return {
        userMessage: data.message,
        title: 'Validation error'
      };
    }

    if (errorCode === 413) {
      return {
        userMessage: 'The file could not be uploaded because it is too large for the system to handle.'
          + ' Please contact technical support.',
        title: 'Uploaded file is too large'
      };
    }

    if (errorCode >= 500 && errorCode < 600) {
      return {
        userMessage: 'The server is unavailable. Please try again.'
          + ' If the problem persists, please notify technical support.'
      };
    }

    if (errorCode === 404) {
      return {
        userMessage: 'The data you are requesting does not exist.',
        title: 'Document not found'
      };
    }

    if (errorCode === 401 || errorCode === 403) {
      // Handled by authorization module
      return null;
    }

    return {
      userMessage: 'TODO - meaningful error message'
    };
  };

  return {
    responseError: function(response) {
      var notificationData = getNotificationMessage(response.status, response.data);
      notificationService.notifyError(notificationData);
      return $q.reject(response);
    }
  };
};

httpErrorHandlerFactory.$inject = ['$q', 'notificationService'];

errorHandling
  .factory('httpErrorHandlerFactory', httpErrorHandlerFactory);
