describe('fa.notifications.notificationService > ', function describeImpl() {
  var toaster;
  var notificationService;
  var logService;

  var popSpy;
  var errorSpy;
  var warnSpy;
  var infoSpy;

  var defaultTitle = 'System Notification';
  var defaultUserMessage = 'The system was unable to process your request. ' +
    'If the problem persists, please contact technical support.';
  var customTitle = 'the title';
  var customUserMessage = 'the user message';
  var customTechnicalMessage = 'the tech message';

  beforeEach(angular.mock.module('fa.notifications'));

  beforeEach(inject(function injectImpl(_toaster_, _notificationService_, _$log_) {
    toaster = _toaster_;
    notificationService = _notificationService_;
    logService = _$log_;

    popSpy = sinon.spy(toaster, 'pop');
    errorSpy = sinon.spy(logService, 'error');
    warnSpy = sinon.spy(logService, 'warn');
    infoSpy = sinon.spy(logService, 'info');
  }));

  afterEach(function afterEachImpl() {
    toaster.pop.restore();
    logService.error.restore();
    logService.warn.restore();
    logService.info.restore();
  });

  describe('notifyFatalNoLogAvailable', function notifyFatalDescribeImpl() {
    it('should invoke pop method with correct values', function testImpl() {
      var title = 'Logging Notification';
      var message =
        'The system was unable to communicate with the logging service. Please contact technical support.';
      notificationService.notifyFatalNoLogAvailable({
        title: title,
        userMessage: message
      });
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'error',
        title: title,
        body: message,
        timeout: 0
      });
    });
  });

  describe('notifyError', function notifyErrorDescribeImpl() {
    it('should invoke pop method with correct default values', function testImpl() {
      notificationService.notifyError({});
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'error',
        title: defaultTitle,
        body: defaultUserMessage,
        timeout: 0
      });
    });

    it('should invoke pop method with custom values', function testImpl() {
      notificationService.notifyError({
        title: customTitle,
        userMessage: customUserMessage
      });
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'error',
        title: customTitle,
        body: customUserMessage,
        timeout: 0
      });
    });

    it('should invoke error method with correct default value', function testImpl() {
      notificationService.notifyError({});
      var actualParam = errorSpy.getCall(0).args[0];
      actualParam.should.equal(
        'No technical message was provided for the following error: \'' + defaultUserMessage + '\'');
    });

    it('should invoke error method with custom value', function testImpl() {
      notificationService.notifyError({
        technicalMessage: customTechnicalMessage
      });
      var actualParam = errorSpy.getCall(0).args[0];
      actualParam.should.equal(customTechnicalMessage);
    });
  });

  describe('notifyWarning', function notifyWarningDescribeImpl() {
    it('should invoke pop method with correct default values', function testImpl() {
      notificationService.notifyWarning({});
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'warning',
        title: defaultTitle,
        body: defaultUserMessage,
        timeout: 0
      });
    });

    it('should invoke pop method with custom values', function testImpl() {
      notificationService.notifyWarning({
        title: customTitle,
        userMessage: customUserMessage
      });
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'warning',
        title: customTitle,
        body: customUserMessage,
        timeout: 0
      });
    });

    it('should not invoke warn method', function testImpl() {
      notificationService.notifyWarning({});
      warnSpy.callCount.should.equal(0);
    });

    it('should invoke warn method with custom value', function testImpl() {
      notificationService.notifyWarning({
        technicalMessage: customTechnicalMessage
      });
      var actualParam = warnSpy.getCall(0).args[0];
      actualParam.should.equal(customTechnicalMessage);
    });
  });

  describe('notifyInfo', function notifyInfoDescribeImpl() {
    it('should invoke pop method with correct default values', function testImpl() {
      notificationService.notifyInfo({});
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'info',
        title: defaultTitle,
        body: defaultUserMessage,
        timeout: 0
      });
    });

    it('should invoke pop method with custom values', function testImpl() {
      notificationService.notifyInfo({
        title: customTitle,
        userMessage: customUserMessage
      });
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'info',
        title: customTitle,
        body: customUserMessage,
        timeout: 0
      });
    });

    it('should not invoke info method', function testImpl() {
      notificationService.notifyInfo({});
      infoSpy.callCount.should.equal(0);
    });

    it('should invoke info method with custom value', function testImpl() {
      notificationService.notifyInfo({
        technicalMessage: customTechnicalMessage
      });
      var actualParam = infoSpy.getCall(0).args[0];
      actualParam.should.equal(customTechnicalMessage);
    });
  });

  describe('notifySuccess', function notifySuccessDescribeImpl() {
    it('should invoke pop method with correct default values', function testImpl() {
      notificationService.notifySuccess({});
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'success',
        title: defaultTitle,
        body: defaultUserMessage
      });
    });

    it('should invoke pop method with custom values', function testImpl() {
      notificationService.notifySuccess({
        title: customTitle,
        userMessage: customUserMessage
      });
      var actualParam = popSpy.getCall(0).args[0];
      actualParam.should.deep.equal({
        type: 'success',
        title: customTitle,
        body: customUserMessage
      });
    });

    it('should not invoke info method', function testImpl() {
      notificationService.notifySuccess({});
      infoSpy.callCount.should.equal(0);
    });

    it('should invoke info method with custom value', function testImpl() {
      notificationService.notifySuccess({
        technicalMessage: customTechnicalMessage
      });
      var actualParam = infoSpy.getCall(0).args[0];
      actualParam.should.equal(customTechnicalMessage);
    });
  });
});
