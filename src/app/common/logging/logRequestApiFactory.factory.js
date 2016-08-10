'use strict';

var loggingApi = require('./loggingApi.module');
var logStateChangeHandling = require('./logStateChangeHandling.factory');

function buildLogRequestApiFactory() {
  function buildBaseLogToApiRequest(apiBaseUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', apiBaseUrl + 'api/log');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.onreadystatechange = logStateChangeHandling.buildReadyStateChangeHandler(xhr);
    return xhr;
  }

  return {
    buildLogReadyStateChangeHandler: logStateChangeHandling.buildLogReadyStateChangeHandler,
    buildBaseLogToApiRequest: buildBaseLogToApiRequest
  };
}

buildLogRequestApiFactory.$inject = [logStateChangeHandling.name];

loggingApi.factory('logRequestApiFactory', buildLogRequestApiFactory);
