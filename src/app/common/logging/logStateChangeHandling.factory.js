'use strict';

var loggingApi = require('./loggingApi.module');
var strings = require('../../imports/strings.angularImport');
var xhrStates = require('./xhrStates.constant');

function buildLogStateChangeHandling() {
  function buildReadyStateChangeHandler(xhr) {
    return function logReadyStateChangeHandler() {
      if (xhr.readyState === xhrStates.READY_STATE && xhr.status !== xhrStates.SUCCESS_CODE) {
        var errorMessageFormat =
          'A logging error has occurred: readyState = \'{state}\', statusCode = \'{status}\'.';
        var errorMessage = strings.format(errorMessageFormat, {
          state: xhr.readyState,
          status: xhr.status
        });
        throw new Error(errorMessage);
      }
    };
  }

  return {
    buildReadyStateChangeHandler: buildReadyStateChangeHandler
  };
}

buildLogStateChangeHandling.$inject = [strings.name, xhrStates.name];

loggingApi.factory('logStateChangeHandling', buildLogStateChangeHandling);
