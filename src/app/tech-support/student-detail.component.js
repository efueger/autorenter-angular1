'use strict';

var techSupport = require('./tech-support.module');
var studentDetailTemplate = require('./student-detail.component.html');

techSupport.component('faStudentDetail', {
  template: studentDetailTemplate,
  bindings: {
    student: '<'
  }
});