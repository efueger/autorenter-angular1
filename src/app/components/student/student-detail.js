(function init() {
  'use strict';

  angular
    .module('app.components.student')
    .component('studentDetail', {
      templateUrl: 'app/student-detail.html',
      bindings: {
        student: '<'
      }
    }
  );
}());
