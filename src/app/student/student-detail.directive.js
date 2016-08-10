'use strict';

angular
  .module('students')
  .directive('studentDetail', function studentDetail() {
    return {
      restrict: 'E',
      controllerAs: 'studentDetail',
      templateUrl: 'app/student-detail.html',
      scope: {
        student: '='
      },
      controller: 'studentDetailCtrl'
    };
  });
