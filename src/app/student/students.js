'use strict';

var students = require('./students.module');

require('./students.controller');
require('./student-detail.directive');
require('./student-detail.controller');

module.exports = students;
