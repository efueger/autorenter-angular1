describe('fa.confirmations.confirmationService > ', function describeImpl() {
  var confirmationService;
  var openSpy;
  var popupText  = 'the text';

  beforeEach(angular.mock.module('fa.confirmations'));

  beforeEach(inject(function injectImpl(_$uibModal_, _confirmationService_) {
    openSpy = sinon.spy(_$uibModal_, 'open');
    confirmationService = _confirmationService_;
  }));

  describe('show', function executeShowTests() {
    var args;
    var result;
    beforeEach(function beforeEach() {
      result = confirmationService.show(popupText);
      args = openSpy.getCall(0).args;
    });

    it('calls open with correct number of args', function testImpl() {
      args.length.should.equal(1);
    });

    it('calls open with correct templateUrl', function testImpl() {
      args[0].templateUrl.should.equal('app/confirmation.html');
    });

    it('calls open with correct controllerAs', function testImpl() {
      args[0].controllerAs.should.equal('modalVm');
    });

    it('calls open with correct controller', function testImpl() {
      args[0].controller.should.equal('ConfirmationController');
    });

    it('calls open with correct resolve object', function testImpl() {
      var resolveObject = args[0].resolve;
      resolveObject.popupText.should.be.a.function;
      resolveObject.popupText().should.equal(popupText);
    });

    it('returns correct result', function testImpl() {
      result.should.deep.equal(openSpy.getCall(0).returnValue.result);
    });
  });
});
