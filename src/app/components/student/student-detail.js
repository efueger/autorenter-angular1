(function init() {
  'use strict';

  angular
    .module('app')
    .component('studentDetail', {
      templateUrl: 'app/student-detail.html',
      bindings: {
        student: '<'
      }
    }
  );
}());
