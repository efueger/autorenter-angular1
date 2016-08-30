'use strict';

var notifications = require('./notifications.module');

function NotificationService($log, toaster) {
  var self = this;

  self.notifyFatal = function notifyFatal() {
    toaster.pop({
      type: 'error',
      title: 'the fatal title',
      body: 'the fatal message',
      timeout: 0
    });
  };

  self.notifyError = function notifyError() {
    toaster.pop({
      type: 'error',
      title: 'the error title',
      body: 'the error message',
      timeout: 0
    });
    $log.error('the error message');
  };

  self.notifyWarning = function notifyWarning() {
    toaster.pop({
      type: 'warning',
      title: 'the warning title',
      body: 'the warning message',
      timeout: 0
    });
    $log.warn('the warn message');
  };

  self.notifyInfo = function notifyInfo() {
    toaster.pop({
      type: 'info',
      title: 'the info title',
      body: 'the info message',
      timeout: 0
    });
    $log.info('the info message');
  };

  self.notifyDebug = function notifyDebug() {
    $log.debug('the debug message');
  };

  self.notifySuccess = function notifySuccess() {
    toaster.pop({
      type: 'success',
      title: 'the success title',
      body: 'the success message'
    });
    $log.info('the success message');
  };
}

NotificationService.$inject = ['$log', 'toaster'];

notifications.service('NotificationService', NotificationService);
