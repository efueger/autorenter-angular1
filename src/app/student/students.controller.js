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

  self.checkHttpErrorHandlerSuccess = function checkHttpErrorHandler() {
    $http({
      method: 'GET',
      url: generalConfig.apiUrl
    }).then(function successCallback(response) {
      console.log('success - response = ' + response.status); // eslint-disable-line no-console
    }, function errorCallback(response) {
      console.log('unexpected error - response = ' + response.status); // eslint-disable-line no-console
    });
  };

  self.checkHttpErrorHandlerError = function checkHttpErrorHandler() {
    $http({
      method: 'GET',
      url: generalConfig.apiUrl + 'foo'
    }).then(function successCallback(response) {
      console.log('unexpected success - response = ' + response.status); // eslint-disable-line no-console
    }, function errorCallback(response) {
      console.log('error - response = ' + response.status); // eslint-disable-line no-console
    });
  };

  $http.get(generalConfig.apiUrl).then(function apiSuccess(res) {
    self.apiResponse = res.data;
  }, function apiError() {
    // log error
  });
}

StudentsController.$inject = ['$http', '$log', 'generalConfig', 'notificationService'];

students.controller('StudentsController', StudentsController);
