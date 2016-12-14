require('./log-api.provider');

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
    request.url.should.equal(generalConfig.apiUrl + '/log');
  });

  it('should set request headers', function testImpl() {
    request.requestHeaders.should.deep.equal({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8'
    });
  });

  describe('on fail', function onFailTest() {
    var READY_STATE = 4;
    var SERVER_ERROR_CODE = 500;

    beforeEach(function beforeEachImpl() {
      request.status = SERVER_ERROR_CODE;
      request.readyState = READY_STATE;

      sinon.spy(console, 'error');
    });

    afterEach(function afterEachImpl() {
      console.error.restore(); // eslint-disable-line no-console
    });

    it('should log error to console', function testImpl() {
      request.onreadystatechange();
      var technicalMessage = 'A logging error has occurred: readyState = \'' + READY_STATE
        + '\', statusCode = \'' + SERVER_ERROR_CODE + '\'.';
      console.error.getCall(0).args[0].should.equal(technicalMessage); // eslint-disable-line no-console
    });

    it('should report error via the notification service', function testImpl() {
      var notifySpy = sinon.spy(notificationService, 'notifyError');
      var applySpy = sinon.spy(scope, '$apply');
      request.onreadystatechange();

      var actualArgs = notifySpy.getCall(0).args[0];
      actualArgs.should.deep.equal({
        title: 'Logging Notification',
        userMessage: 'The system was unable to communicate with the logging service. Please contact technical support.',
        noLog: true
      });
      applySpy.calledOnce.should.be.true;
    });
  });
});
