'use strict';

var student = require('./students.module');

function studentsRouteConfig($stateProvider) {
  $stateProvider
    .state('students', {
      url: '/students',
      views: {
        '@': {
          templateUrl: 'app/students.html',
          controller: 'StudentsController',
          controllerAs: 'studentsController'
        }
      },
      ncyBreadcrumb: {
        label: 'students'
      }
    });
}

studentsRouteConfig.$inject = ['$stateProvider'];

student.config(studentsRouteConfig);
