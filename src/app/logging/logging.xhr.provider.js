'use strict';

var logging = require('./logging.module');

function xhrFactory(generalConfig, strings) {
  return {
    $get: function getXhr() {
      var READY_STATE = 4;
      var SUCCESS_CODE = 201;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', strings.format('{apiUrl}api/log', {apiUrl: generalConfig.apiUrl}));
      xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      xhr.onreadystatechange = function onReadyStateChange() {
        if (xhr.readyState === READY_STATE && xhr.status !== SUCCESS_CODE) {
          var errorMessageFormat =
            'A logging error has occurred: readyState = \'{state}\', statusCode = \'{status}\'.';
          var errorMessage = strings.format(errorMessageFormat, {
            state: xhr.readyState,
            status: xhr.status
          });
          throw new Error(errorMessage);
        }
      };
      return xhr;
    }
  };
}

xhrFactory.$inject = ['generalConfig', 'strings'];

logging.provider('xhr', xhrFactory);
