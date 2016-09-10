'use strict';

var logging = require('./logging.module');

function logApi(generalConfig, strings) {
  var xhrProvider;

  function XhrProvider() {
    var self = this;
    var READY_STATE = 4;
    var SUCCESS_CODE = 201;

    this._notificationService;
    this._scope;

    this.setNotificationService = function setNotificationService(notificationService) {
      self._notificationService = notificationService;
    };

    this.setScope = function setScope(scope) {
      self._scope = scope;
    };

    this.getXhr = function getXhr() {
      var ajax = new XMLHttpRequest();
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
          self._notificationService.notifyFatalNoLogAvailable({technicalMessage: errorMessage});
          self._scope.$apply();
        }
      };
      return ajax;
    };
  }

  xhrProvider = new XhrProvider();

  this.$get = function get() {
    return xhrProvider;
  };
}

logApi.$inject = ['generalConfig', 'strings'];

logging.provider('logApi', logApi);
