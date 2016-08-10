'use strict';

var students = require('./students.module');

function buildStudentDetail() {
  return {
    restrict: 'E',
    controllerAs: 'studentDetail',
    templateUrl: 'app/student-detail.html',
    scope: {
      student: '='
    },
    controller: 'studentDetailCtrl'
  };
}

students.directive('studentDetail', buildStudentDetail);
