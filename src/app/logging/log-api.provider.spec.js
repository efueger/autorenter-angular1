describe('fa.logging.logApi > ', function describeImpl() {
  var logApi;
  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function injectImpl(_logApi_) {
    logApi = _logApi_;
  }));

  it('should post message to API', function shouldPostToApi() {
    // TODO: use the sinon fake service to test an ajax post...
    console.log('logApi = ' + logApi);
  });
});
