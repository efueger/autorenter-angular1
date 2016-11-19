'use strict';

var students = require('./students.module');

require('./students.route.config');
require('./students.controller');
require('./student-detail.component');

module.exports = students;
