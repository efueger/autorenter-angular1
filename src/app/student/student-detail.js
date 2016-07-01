(function init() {
  'use strict';

  angular
    .module('app')
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
    })
    .controller('studentDetailCtrl', ['$scope', function studentDetailCtrl() {}]);
}());
