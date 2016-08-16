'use strict';

var logging = require('./logging.module');

function logApi(generalConfig, strings, xhr) {
  return {
    $get: function getXhr() {
      var READY_STATE = 4;
      var SUCCESS_CODE = 201;
      var ajax = xhr.create();
      ajax.open('POST', strings.format('{apiUrl}api/log', {apiUrl: generalConfig.apiUrl}));
      ajax.setRequestHeader('Accept', 'application/json, text/plain, */*');
      ajax.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      ajax.onreadystatechange = function onReadyStateChange() {
        if (ajax.readyState === READY_STATE && ajax.status !== SUCCESS_CODE) {
          var errorMessageFormat =
            'A logging error has occurred: readyState = \'{state}\', statusCode = \'{status}\'.';
          var errorMessage = strings.format(errorMessageFormat, {
            state: ajax.readyState,
            status: ajax.status
          });
          throw new Error(errorMessage);
        }
      };
      return ajax;
    }
  };
}

logApi.$inject = ['generalConfig', 'strings', 'xhr'];

logging.provider('logApi', logApi);
