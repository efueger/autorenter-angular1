'use strict';

var students = require('./students.module');

function StudentsController($http, $log, generalConfig, notificationService) {
  var self = this;

  self.students = [
    { name: 'Josh' },
    { name: 'Chris' },
    { name: 'Sarah' }];

  self.addStudent = function addStudent(name) {
    self.students.push({ name: name });
    $log.debug('added ' + name);
    $log.info('added ' + name);
    $log.warn('added ' + name);
    $log.error('added ' + name);
  };

  self.showFatal = function showFatal() {
    notificationService.notifyFatalNoLogAvailable({
      technicalMessage: 'the fatal error tech message'
    });
  };

  self.showError = function showError() {
    notificationService.notifyError({
      title: 'The error title',
      userMessage: 'Oops, an error!',
      technicalMessage: 'technical error message'
    });
  };

  self.showWarning = function showWarning() {
    notificationService.notifyWarning({
      userMessage: 'A warning',
      technicalMessage: 'technical warning message'
    });
  };

  self.showInfo = function showInfo() {
    notificationService.notifyInfo({
      userMessage: 'An informational message',
      technicalMessage: 'technical info message'
    });
  };

  self.showSuccess = function showSuccess() {
    notificationService.notifySuccess({
      userMessage: 'Hooray, it worked!',
      technicalMessage: 'technical success message'
    });
  };

  self.throwException = function throwException() {
    throw new Error('the test exception');
  };

  $http.get(generalConfig.apiUrl).then(function apiSuccess(res) {
    self.apiResponse = res.data;
  }, function apiError() {
    // log error
  });
}

StudentsController.$inject = ['$http', '$log', 'generalConfig', 'notificationService'];

students.controller('StudentsController', StudentsController);
