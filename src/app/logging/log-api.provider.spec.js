describe('fa.logging.logApi > ', function describeImpl() {
  var fakeXhr;
  var request;
  var generalConfig;

  beforeEach(angular.mock.module('app'));

  beforeEach(function proxyXhrCreation() {
    fakeXhr = sinon.useFakeXMLHttpRequest();
    fakeXhr.onCreate = function onCreate(req) {
      request = req;
    };
  });

  beforeEach(inject(function injectImpl(_logApi_, _generalConfig_) {
    // NOTE: The XMLHttpRequest, and therefore the 'request' variable (by virtue of the 'proxyXhrCreation'
    //       beforeEach function), is automatically created when _logApi_ is injected.

    generalConfig = _generalConfig_;
  }));

  afterEach(function afterEach() {
    fakeXhr.restore();
  });

  it('should set method to POST', function testImpl() {
    request.method.should.equal('POST');
  });

  it('should set url', function testImpl() {
    request.url.should.equal(generalConfig.apiUrl + 'api/log');
  });

  it('should set request headers', function testImpl() {
    request.requestHeaders.should.deep.equal({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8'
    });
  });

  it('should throw error on fail', function testImpl() {
    var READY_STATE = 4;
    var SERVER_ERROR_CODE = 500;
    request.status = SERVER_ERROR_CODE;
    request.readyState = READY_STATE;
    try {
      request.onreadystatechange();
      throw new Error('Should not be here.');
    } catch (err) {
      err.message.should.equal('A logging error has occurred: readyState = \'' + READY_STATE
        + '\', statusCode = \'' + SERVER_ERROR_CODE + '\'.');
    }
  });

  it('should not throw error on success', function testImpl() {
    var READY_STATE = 4;
    var SUCCESS_CODE = 201;
    request.status = SUCCESS_CODE;
    request.readyState = READY_STATE;
    try {
      request.onreadystatechange();
    } catch (err) {
      throw new Error('Should not be here.');
    }
  });
});
