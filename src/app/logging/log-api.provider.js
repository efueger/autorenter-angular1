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
          // No logging because API is unreachable. This is a last gasp effort to present something to the user.
          var technicalMessageFormat =
            'A logging error has occurred: readyState = \'{state}\', statusCode = \'{status}\'.';
          var technicalMessage = strings.format(technicalMessageFormat, {
            state: ajax.readyState,
            status: ajax.status
          });
          console.error(technicalMessage); // eslint-disable-line no-console
          self._notificationService.notifyError({
            title: 'Logging Notification',
            userMessage: 'The system was unable to communicate with the logging service. Please contact technical support.',
            noLog: true
          });
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
