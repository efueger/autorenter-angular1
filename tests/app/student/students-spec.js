describe('App > ', function init() {
  beforeEach(module('app'));

  describe('students >', function testStudent() {
    it('should add students correctly', inject(function test1($controller) {
      var myController = $controller('StudentsController');

      myController.addStudent('Bob');

      myController.students[3].name.should.equal('Bob');
    }));
  });
});
