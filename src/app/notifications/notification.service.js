'use strict';

var notifications = require('./notifications.module');

function NotificationService($log, toaster, strings) {
  var self = this;

  var defaultTitle = 'System Notification';

  var defaultUserMessage = 'The system was unable to process your request. ' +
    'If the problem persists, please contact technical support.';

  self.notifyError = function notifyError(notificationData) {
    var body = notificationData.userMessage || defaultUserMessage;
    toaster.pop({
      type: 'error',
      title: notificationData.title || defaultTitle,
      body: body,
      timeout: 0
    });

    if (!notificationData.noLog) {
      if (notificationData.technicalMessage) {
        $log.error(notificationData.technicalMessage);
      } else {
        var technicalMessageFormat =
          'No technical message was provided for the following error: \'{body}\'';
        var technicalMessage = strings.format(technicalMessageFormat, { body: body });
        $log.error(technicalMessage);
      }
    }
  };

  self.notifyWarning = function notifyWarning(notificationData) {
    toaster.pop({
      type: 'warning',
      title: notificationData.title || defaultTitle,
      body: notificationData.userMessage || defaultUserMessage,
      timeout: 0
    });

    if (notificationData.technicalMessage) {
      $log.warn(notificationData.technicalMessage);
    }
  };

  self.notifyInfo = function notifyInfo(notificationData) {
    toaster.pop({
      type: 'info',
      title: notificationData.title || defaultTitle,
      body: notificationData.userMessage || defaultUserMessage,
      timeout: 0
    });

    if (notificationData.technicalMessage) {
      $log.info(notificationData.technicalMessage);
    }
  };

  self.notifySuccess = function notifySuccess(notificationData) {
    toaster.pop({
      type: 'success',
      title: notificationData.title || defaultTitle,
      body: notificationData.userMessage || defaultUserMessage,
    });

    if (notificationData.technicalMessage) {
      $log.info(notificationData.technicalMessage);
    }
  };
}

NotificationService.$inject = ['$log', 'toaster', 'strings'];

notifications.service('notificationService', NotificationService);
