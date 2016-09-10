'use strict';

var logging = require('./logging.module');

function run(logApi, notificationService, $rootScope) {
  logApi.setNotificationService(notificationService);
  logApi.setScope($rootScope);
}

run.$inject = ['logApi', 'notificationService', '$rootScope'];

logging.run(run);
