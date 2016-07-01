(function init() {
  function StudentCtrl($http) {
    this.students = [
      { name: 'Josh' },
      { name: 'Chris' },
      { name: 'Sarah' }];

    this.addStudent = function addStudent(name) {
      this.students.push({ name: name });
    };

    $http.get('').success(function apiSuccess(data) {
      this.apiResponse = data;
    }).error(function apiError() {
      // log error
    });
  }

  angular
    .module('app')
    .controller('StudentCtrl', StudentCtrl);
}());
