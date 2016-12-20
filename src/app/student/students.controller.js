'use strict';

var students = require('./students.module');

function StudentsController($http, $log, generalConfig, notificationService) {
  var vm = this;

  vm.students = [
    { name: 'Josh' },
    { name: 'Chris' },
    { name: 'Sarah' }];

  vm.addStudent = function addStudent(name) {
    vm.students.push({ name: name });
    $log.debug('added ' + name);
    $log.info('added ' + name);
    $log.warn('added ' + name);
    $log.error('added ' + name);
  };

  vm.showError = function showError() {
    notificationService.notifyError({
      title: 'The error title',
      userMessage: 'Oops, an error!',
      technicalMessage: 'technical error message'
    });
  };

  vm.showWarning = function showWarning() {
    notificationService.notifyWarning({
      userMessage: 'A warning',
      technicalMessage: 'technical warning message'
    });
  };

  vm.showInfo = function showInfo() {
    notificationService.notifyInfo({
      userMessage: 'An informational message',
      technicalMessage: 'technical info message'
    });
  };

  vm.showSuccess = function showSuccess() {
    notificationService.notifySuccess({
      userMessage: 'Hooray, it worked!',
      technicalMessage: 'technical success message'
    });
  };

  vm.throwException = function throwException() {
    throw new Error('the test exception');
  };

  vm.checkHttpErrorHandlerSuccess = function checkHttpErrorHandler() {
    $http({
      method: 'GET',
      url: generalConfig.apiUrlRoot
    }).then(function successCallback(response) {
      $log.log('success - response = ' + response.status);
    }, function errorCallback(response) {
      $log.log('unexpected error - response = ' + response.status);
    });
  };

  vm.checkHttpErrorHandlerError = function checkHttpErrorHandler() {
    $http({
      method: 'GET',
      url: generalConfig.apiUrlRoot + 'raise-error'
    }).then(function successCallback(response) {
      $log.log('unexpected success - response = ' + response.status);
    }, function errorCallback(response) {
      $log.log('error - response = ' + response.status);
    });
  };

  $http.get(generalConfig.apiUrlRoot).then(function apiSuccess(res) {
    vm.apiResponse = res.data;
  }, function apiError() {
    // log error
  });
}

StudentsController.$inject = ['$http', '$log', 'generalConfig', 'notificationService'];

students.controller('StudentsController', StudentsController);
