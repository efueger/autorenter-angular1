// var sinon = require('sinon');

describe('fa.logging.logApi > ', function describeImpl() {
  // var fakeServer;
  var logApi;
  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function injectImpl(_logApi_) {
    logApi = _logApi_;

    // fakeServer = sinon.fakeServer.create();
  }));

  // afterEach(function afterEach() {
    // fakeServer.restore();
  // });

  it('should post message to API', function shouldPostToApi() {
    // TODO: use the sinon fake service to test an ajax post...
    console.log('logApi = ' + logApi);
  });
});
