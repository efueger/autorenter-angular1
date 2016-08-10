'use strict';

var angular = require('angular');
var appConfig = require('../app.config');

function StudentCtrl($http, $log) {
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

  $http.get(appConfig.generalConfig.apiUrl).then(function apiSuccess(res) {
    self.apiResponse = res.data;
  }, function apiError() {
    // log error
  });
}

angular
  .module('students')
  .controller('StudentCtrl', ['$http', '$log', StudentCtrl, appConfig.name]);
