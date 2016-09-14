describe('fa.errorHandling.httpErrorHandler > ', function describeImpl() {
  var httpErrorHandler;
  var $rootScope;
  var notifyErrorSpy;

  beforeEach(angular.mock.module('fa.errorHandling'));

  beforeEach(inject(function injectImpl(_httpErrorHandler_, _notificationService_, _$rootScope_) {
    httpErrorHandler = _httpErrorHandler_;
    $rootScope = _$rootScope_;

    notifyErrorSpy = sinon.spy(_notificationService_, 'notifyError');
  }));

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

  it('should notify user on status code 413', function testImpl() {
    var actualArgs;
    httpErrorHandler.responseError({
      status: 413
    })
      .catch(function catchHandler() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $rootScope.$apply();
    actualArgs.should.deep.equal({
      userMessage: 'The request could not be processed because it is too large for the system to handle.'
        + ' Please contact technical support.'
    });
  });

  describe('should notify for', function positiveRangeTest() {
    var statusCodes = [];
    for (var i = 500; i < 600; i++) {
      statusCodes.push(i);
    }

    statusCodes.forEach(function statusTest(status) {
      it('status code ' + status, function testImpl() {
        var actualArgs;
        httpErrorHandler.responseError({
          status: status
        })
          .catch(function catchHandler() {
            actualArgs = notifyErrorSpy.getCall(0).args[0];
          });
        $rootScope.$apply();
        actualArgs.should.deep.equal({
          userMessage: 'The server is unavailable. Please try again.'
          + ' If the problem persists, please notify technical support.',
          noLog: true
        });
      });
    });
  });

  it('should notify user on status code 404', function testImpl() {
    var actualArgs;
    httpErrorHandler.responseError({
      status: 404
    })
      .catch(function catchHandler() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $rootScope.$apply();
    actualArgs.should.deep.equal({
      title: 'Document not found',
      userMessage: 'The data you are requesting does not exist.'
    });
  });

  describe('should not notify for', function negativeRangeTest() {
    var statusCodes = [401, 403];
    statusCodes.forEach(function statusTest(status) {
      it('status code ' + status, function testImpl() {
        var isCalled;
        httpErrorHandler.responseError({status: status})
          .catch(function catchHandler() {
            isCalled = notifyErrorSpy.called;
          });
        $rootScope.$apply();
        isCalled.should.be.false;
      });
    });
  });

  it('should notify user on other status code', function testImpl() {
    var actualArgs;
    httpErrorHandler.responseError({status: 600})
      .catch(function catchHandler() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $rootScope.$apply();
    actualArgs.should.deep.equal({
      title: 'General response error'
    });
  });
});
