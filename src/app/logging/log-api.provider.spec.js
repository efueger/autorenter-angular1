describe('fa.logging.logApi > ', function describeImpl() {
  var generalConfig;
  var logApiProvider;
  var notificationService;
  var scope;
  var xhrCreationHandle;
  var request;

  beforeEach(angular.mock.module('fa.notifications'));
  beforeEach(angular.mock.module('fa.logging'));

  beforeEach(inject(function injectImpl(_generalConfig_, _notificationService_, _$rootScope_, _logApi_) {
    generalConfig = _generalConfig_;
    notificationService = _notificationService_;
    scope = _$rootScope_;
    logApiProvider = _logApi_;
  }));

  beforeEach(function proxyXhrCreation() {
    xhrCreationHandle = sinon.useFakeXMLHttpRequest();
    xhrCreationHandle.onCreate = function onCreate(req) {
      request = req;
    };

    // This causes the fake/proxied request (which is used to verify functionality) to be created.
    logApiProvider.getXhr();
  });

  afterEach(function afterEach() {
    xhrCreationHandle.restore();
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

  it('should notify on fail', function testImpl() {
    var notifySpy = sinon.spy(notificationService, 'notifyFatalNoLogAvailable');
    var applySpy = sinon.spy(scope, '$apply');
    var READY_STATE = 4;
    var SERVER_ERROR_CODE = 500;
    request.status = SERVER_ERROR_CODE;
    request.readyState = READY_STATE;
    request.onreadystatechange();

    var errorMessage = 'A logging error has occurred: readyState = \'' + READY_STATE
      + '\', statusCode = \'' + SERVER_ERROR_CODE + '\'.';
    var actualArgs = notifySpy.getCall(0).args[0];
    actualArgs.should.deep.equal({ technicalMessage: errorMessage });
    applySpy.calledOnce.should.be.true;
  });
});
