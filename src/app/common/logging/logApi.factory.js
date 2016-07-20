(function logApiFactory() {
  'use strict';

  function buildLogApi(logRequestApiFactory) {
    function logToApi(baseApiUrl, message, severity) {
      // Do NOT use $http in the context of logging because it creates a circular dependency, initiates the digest
      // loop, and makes logging to the API impossible if Angular itself if hosed.

      var payload = {
        message: message,
        level: severity,
        username: 'bill'
      };
      var request = logRequestApiFactory.buildBaseLogToApiRequest(baseApiUrl);

      request.send(JSON.stringify(payload));
    }

    return { logToApi: logToApi };
  }

  buildLogApi.$inject = ['logRequestApiFactory'];

  angular.module('loggingApi').factory('logApi', buildLogApi);
})();
