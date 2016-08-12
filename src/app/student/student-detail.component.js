'use strict';

var students = require('./students.module');

students.component('faStudentDetail', {
  templateUrl: 'app/student-detail.component.html',
  bindings: {
    student: '<'
  }
});
