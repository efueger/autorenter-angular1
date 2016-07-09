(function init() {
  function StudentCtrl($http, $log) {
    this.students = [
      { name: 'Josh' },
      { name: 'Chris' },
      { name: 'Sarah' }];

    this.addStudent = function addStudent(name) {
      this.students.push({ name: name });
      $log.debug('debug added ' + name);
      $log.info('some info for testing');
      $log.warn('a warning for testing');
      $log.error('an error for testing');
    };

    $http.get('').success(function apiSuccess(data) {
      this.apiResponse = data;
    }).error(function apiError() {
      // log error
    });
  }

  angular
    .module('app')
    .controller('StudentCtrl', ['$http', '$log', StudentCtrl]);
}());
