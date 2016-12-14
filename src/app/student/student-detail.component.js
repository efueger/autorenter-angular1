'use strict';

var students = require('./students.module');
var studentDetailTemplate = require('./student-detail.component.html');

students.component('faStudentDetail', {
  template: studentDetailTemplate,
  bindings: {
    student: '<'
  }
});
