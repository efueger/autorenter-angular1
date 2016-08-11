'use strict';

var students = require('./students.module');

function buildFaStudentDetail() {
  return {
    templateUrl: 'app/student-detail.component.html',
    bindings: {
      student: '<'
    }
  };
}

buildFaStudentDetail.$inject = [];

students.component('faStudentDetail', buildFaStudentDetail);
