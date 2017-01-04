'use strict';

var techSupport = require('./tech-support.module');

function TechSupportController($http, $log, generalConfig, notificationService) {
  var vm = this;

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

  vm.getApiInfo = function getApiInfo() {
    $http.get(generalConfig.apiUrlRoot)
      .then(function apiSuccess(res) {
        vm.apiResponse = res.data;
      });
  };

  vm.getApiInfo();
}

TechSupportController.$inject = ['$http', '$log', 'generalConfig', 'notificationService'];

techSupport.controller('TechSupportController', TechSupportController);
