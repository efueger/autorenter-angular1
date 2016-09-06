describe('fa.errorHandling.$exceptionHandler > ', function describeImpl() {
  var exceptionHandler;
  var notificationService;

  beforeEach(angular.mock.module('fa.errorHandling'));

  beforeEach(inject(function injectImpl(_notificationService_, _$exceptionHandler_) {
    notificationService = _notificationService_;
    exceptionHandler = _$exceptionHandler_;
  }));

  it('should notify user', function testImpl() {
    var notifyErrorSpy = sinon.spy(notificationService, 'notifyError');
    var error = new Error('oops!');
    exceptionHandler(error);
    var actualArgs = notifyErrorSpy.getCall(0).args[0];
    actualArgs.should.deep.equal({technicalMessage: error.toString()});
  });
});
