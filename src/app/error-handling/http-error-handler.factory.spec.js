var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');
require('./http-error-handler.factory');

describe('fa.errorHandling.httpErrorHandler > ', function describeImpl() {
  var httpErrorHandler;
  var $rootScope;
  var sandbox;
  var inputs;

  beforeEach(angular.mock.module('fa.errorHandling'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    inputs = {
      mocks: {
        notificationService: {notifyError: function() {}}
      },
      spies: {}
    };
    inputs.spies.notifyError = sandbox.spy(inputs.mocks.notificationService, 'notifyError');

    angular.mock.module(function($provide) {
      $provide.value('notificationService', inputs.mocks.notificationService);
    });

    inject(function injectImpl(_httpErrorHandler_, _$rootScope_) {
      httpErrorHandler = _httpErrorHandler_;
      $rootScope = _$rootScope_;
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  function assertNotifyErrorCalledCorrectly(options) {
    httpErrorHandler.responseError({status: options.status, data: options.data || {}});

    $rootScope.$digest();
    return inputs.spies.notifyError.withArgs(options.expected).calledOnce.should.be.true;
  }

  it('should notify user on status code 400', function testImpl() {
    var userMessage = 'some validation error message';
    assertNotifyErrorCalledCorrectly({
      status: 400,
      data: {message: userMessage },
      expected: {
        title: 'Validation error',
        userMessage: userMessage,
        noLog: true
      }
    });

  });

  it('should notify user on status code 413', function testImpl() {
    assertNotifyErrorCalledCorrectly({
      status: 413,
      expected: {
        userMessage: 'The request could not be processed because it is too large for the system to handle.'
        + ' Please contact technical support.'
      }
    });
  });

  describe('should notify user on', function positiveRangeTest() {
    var statusCodes = [];
    for (var i = 500; i < 600; i++) {
      statusCodes.push(i);
    }
    statusCodes.forEach(function statusTest(status) {
      it('status code ' + status, function testImpl() {
        assertNotifyErrorCalledCorrectly({
          status: status,
          expected: {
            userMessage: 'The server is unavailable. Please try again.'
            + ' If the problem persists, please notify technical support.',
            noLog: true
          }
        });
      });
    });
  });

  it('should notify user on status code 404', function testImpl() {
    assertNotifyErrorCalledCorrectly({
      status: 404,
      expected: {
        title: 'Document not found',
        userMessage: 'The data you are requesting does not exist.'
      }
    });
  });

  describe('should not notify user on', function negativeRangeTest() {
    var statusCodes = [401, 403];
    statusCodes.forEach(function statusTest(status) {
      it('status code ' + status, function testImpl() {
        httpErrorHandler.responseError({status: status, data: {}});

        $rootScope.$digest();
        return inputs.spies.notifyError.called.should.be.false;
      });
    });
  });

  it('should notify user with general message on other status code', function testImpl() {
    assertNotifyErrorCalledCorrectly({
      status: 600,
      expected: {
        title: 'General response error'
      }
    });
  });
});
