describe('fa.errorHandling.httpErrorHandler > ', function describeImpl() {
  var httpErrorHandler;
  var notificationService;
  var $rootScope;
  var notifyErrorSpy;

  beforeEach(angular.mock.module('fa.errorHandling'));

  beforeEach(inject(function injectImpl(_httpErrorHandler_, _notificationService_, _$rootScope_) {
    httpErrorHandler = _httpErrorHandler_;
    notificationService = _notificationService_;
    $rootScope = _$rootScope_;

    notifyErrorSpy = sinon.spy(notificationService, 'notifyError');
  }));

  afterEach(function afterEachImpl() {
    notificationService.notifyError.restore();
  });

  it('should notify user on status code 400', function testImpl() {
    var actualArgs;
    var userMessage = 'some validation error message';
    httpErrorHandler.responseError({
      status: 400,
      data: {message: userMessage}
    })
      .catch(function catchHandler() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $rootScope.$apply();
    actualArgs.should.deep.equal({
      title: 'Validation error',
      userMessage: userMessage,
      noLog: true
    });
  });
});
