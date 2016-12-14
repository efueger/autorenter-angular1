var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');
require('./http-error-handler.factory');

describe('fa.errorHandling.httpErrorHandler > ', function describeImpl() {
  var notifyErrorSpy;
  var $http;
  var $httpBackend;

  beforeEach(angular.mock.module('fa.errorHandling'));

  beforeEach(inject(function injectImpl(_notificationService_, _$http_, _$httpBackend_) {
    $http = _$http_;
    $httpBackend = _$httpBackend_;

    notifyErrorSpy = sinon.spy(_notificationService_, 'notifyError');
  }));

  it.skip('should notify user on status code 400', function testImpl() {
    var actualArgs;
    var userMessage = 'some validation error message';
    $httpBackend.when('GET', '/foo').respond(400, {message: userMessage});
    $http.get('/foo')
      .catch(function handleResponseError() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $httpBackend.flush();
    actualArgs.should.deep.equal({
      title: 'Validation error',
      userMessage: userMessage,
      noLog: true
    });
  });

  it.skip('should notify user on status code 413', function testImpl() {
    var actualArgs;
    $httpBackend.when('GET', '/foo').respond(413);
    $http.get('/foo')
      .catch(function handleResponseError() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $httpBackend.flush();
    actualArgs.should.deep.equal({
      userMessage: 'The request could not be processed because it is too large for the system to handle.'
        + ' Please contact technical support.'
    });
  });

  describe('should notify user on', function positiveRangeTest() {
    var statusCodes = [];
    for (var i = 500; i < 600; i++) {
      statusCodes.push(i);
    }
    statusCodes.forEach(function statusTest(status) {
      it.skip('status code ' + status, function testImpl() {
        var actualArgs;
        $httpBackend.when('GET', '/foo').respond(status);
        $http.get('/foo')
          .catch(function handleResponseError() {
            actualArgs = notifyErrorSpy.getCall(0).args[0];
          });
        $httpBackend.flush();
        actualArgs.should.deep.equal({
          userMessage: 'The server is unavailable. Please try again.'
            + ' If the problem persists, please notify technical support.',
          noLog: true
        });
      });
    });
  });

  it.skip('should notify user on status code 404', function testImpl() {
    var actualArgs;
    $httpBackend.when('GET', '/foo').respond(404);
    $http.get('/foo')
      .catch(function handleResponseError() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $httpBackend.flush();
    actualArgs.should.deep.equal({
      title: 'Document not found',
      userMessage: 'The data you are requesting does not exist.'
    });
  });

  describe('should not notify user on', function negativeRangeTest() {
    var statusCodes = [401, 403];
    statusCodes.forEach(function statusTest(status) {
      it.skip('status code ' + status, function testImpl() {
        var isCalled;
        $httpBackend.when('GET', '/foo').respond(status);
        $http.get('/foo')
          .then(function handleResponseSuccess() {
            isCalled = notifyErrorSpy.called;
          })
          .catch(function handleResponseError() {
            isCalled = notifyErrorSpy.called;
          });
        $httpBackend.flush();
        isCalled.should.be.false;
      });
    });
  });

  it.skip('should notify user with general message on other status code', function testImpl() {
    var actualArgs;
    $httpBackend.when('GET', '/foo').respond(600);
    $http.get('/foo')
      .catch(function handleResponseError() {
        actualArgs = notifyErrorSpy.getCall(0).args[0];
      });
    $httpBackend.flush();
    actualArgs.should.deep.equal({
      title: 'General response error'
    });
  });
});
