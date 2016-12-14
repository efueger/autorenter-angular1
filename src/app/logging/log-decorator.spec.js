var angular = require('angular');
require('angular-mocks');
require('./logging');

describe('fa.logging > ', function describeImpl() {
  var logDecorator;
  var fakeLogService;
  var fakeLogApiProvider;

  beforeEach(angular.mock.module('fa.notifications'));
  beforeEach(angular.mock.module('fa.logging'));

  beforeEach(function beforeEachImpl() {
    fakeLogApiProvider = {
      payloadCache: {},
      $get: function get() {
        var self = this;
        return {
          getXhr: function getXhr() {
            return {
              send: function send(payload) {
                self.payloadCache = payload;
              }
            };
          }
        };
      }
    };
    fakeLogService = {
      log: function log() {},
      debug: function debug() {},
      info: function info() {},
      warn: function warn() {},
      error: function error() {}
    };
  });

  beforeEach(inject(function injectImpl(_logDecorator_) {
    logDecorator = _logDecorator_;
    logDecorator.decorateLogService(fakeLogService, fakeLogApiProvider);
  }));

  it('should not post log message to API', function testImpl() {
    fakeLogService.log('logged log!');
    fakeLogApiProvider.payloadCache.should.deep.equal({});
  });

  it('should not post debug message to API', function testImpl() {
    fakeLogService.debug('logged debug!');
    fakeLogApiProvider.payloadCache.should.deep.equal({});
  });

  it('should post info message to API', function testImpl() {
    fakeLogService.info('logged info!');
    var expectedPayload = JSON.stringify({
      message: 'logged info!',
      level: 'info',
      username: 'bill'
    });
    fakeLogApiProvider.payloadCache.should.equal(expectedPayload);
  });

  it('should post warn message to API', function testImpl() {
    fakeLogService.warn('logged warn!');
    var expectedPayload = JSON.stringify({
      message: 'logged warn!',
      level: 'warn',
      username: 'bill'
    });
    fakeLogApiProvider.payloadCache.should.equal(expectedPayload);
  });

  it('should post error message to API', function testImpl() {
    fakeLogService.error('logged error!');
    var expectedPayload = JSON.stringify({
      message: 'logged error!',
      level: 'error',
      username: 'bill'
    });
    fakeLogApiProvider.payloadCache.should.equal(expectedPayload);
  });
});
