(function init() {
  'use strict';

  angular
    .module('app.components.student')
    .component('faStudentDetail', {
      templateUrl: 'app/student-detail.component.html',
      bindings: {
        student: '<'
      }
    }
  );
}());
