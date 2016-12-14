'use strict';

var student = require('./students.module');
var studentsTemplate = require('./students.html');

function studentsRouteConfig($stateProvider) {
  $stateProvider
    .state('students', {
      url: '/students',
      views: {
        '@': {
          template: studentsTemplate,
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
