(function init() {
  function StudentCtrl() {
    this.students = [
      { name: 'Josh' },
      { name: 'Chris' },
      { name: 'Sarah' }];

    this.addStudent = function addStudent(name) {
      this.students.push({ name: name });
    };
  }

  angular
    .module('app')
    .controller('StudentCtrl', StudentCtrl);
}());
