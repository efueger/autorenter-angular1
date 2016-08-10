'use strict';

var students = require('./students.module');

function buildStudentDetailCtrl() {}

buildStudentDetailCtrl.$inject = ['$scope'];

students.controller('studentDetailCtrl', buildStudentDetailCtrl);
