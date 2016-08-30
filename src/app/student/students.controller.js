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
    notificationService.notifyFatal();
  };

  self.showError = function showError() {
    notificationService.notifyError();
  };

  self.showWarning = function showWarning() {
    notificationService.notifyWarning();
  };

  self.showInfo = function showInfo() {
    notificationService.notifyInfo();
  };

  self.showSuccess = function showSuccess() {
    notificationService.notifySuccess();
  };

  self.showDebug = function showDebug() {
    notificationService.notifyDebug();
  };

  $http.get(generalConfig.apiUrl).then(function apiSuccess(res) {
    self.apiResponse = res.data;
  }, function apiError() {
    // log error
  });
}

StudentsController.$inject = ['$http', '$log', 'generalConfig', 'NotificationService'];

students.controller('StudentsController', StudentsController);
