describe('fa.logging > ', function describeImpl() {
  var logDecorator;
  var fakeLogService;
  var fakeLogApiProvider;
  beforeEach(function beforeEachImpl() {
    angular.module('fa.logging');
  });
  beforeEach(function beforeEachImpl() {
    fakeLogApiProvider = {
      payloadCache: '',
      $get: function getXhr() {
        console.log('in getXhr()!!!');
        var self = this;
        return {
          send: function send(payload) {
            self.payloadCache = payload;
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

  // beforeEach(inject(function injectImpl(_logDecorator_) {
  //   logDecorator = _logDecorator_;
  //   logDecorator.decorateLogService(fakeLogService, fakeLogApiProvider);
  // }));

  it('should post error message to API', function shouldPostToApi() {
    console.log('logDecorator = ' + logDecorator);
    console.log('fakeLogService', fakeLogService);
    console.log('fakeLogApiProvider', fakeLogApiProvider);
    //
    // fakeLogService.info('logged info!');
    // console.log('the log info array = ' + JSON.stringify(fakeLogService.info.logs));
    // console.log('payload = ' + fakeLogApiProvider.payloadCache);
    // fakeLogApiProvider.payloadCache.should.equal('logged info!');
  });
});
