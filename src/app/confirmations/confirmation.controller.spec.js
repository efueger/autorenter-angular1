require('./confirmation.controller');

describe('fa.confirmations.ConfirmationController > ', function describeImpl() {
  var controller;
  var popupText  = 'the text';

  // See Morris A. Singer's comments to explain why we don't use the injected $uibModalInstance:
  // http://stackoverflow.com/questions/22246813/unit-testing-a-modalinstance-controller-with-karma-jasmine
  var fakeModalInstance = {
    close: function close() { return true; },
    dismiss: function dismiss() { return false; }
  };

  beforeEach(angular.mock.module('fa.confirmations'));

  beforeEach(function beforeEach() {
    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('ConfirmationController', {
          '$uibModalInstance': fakeModalInstance,
          'popupText': popupText
        });
      }
    ]);
  });

  it('popupText should be initialized', function testImpl() {
    controller.popupText.should.equal(popupText);
  });

  it('close is called on confirm', function testImpl() {
    var modalInstanceCloseSpy = sinon.spy(fakeModalInstance, 'close');
    controller.confirm();
    modalInstanceCloseSpy.called.should.be.true;
  });

  it('dismiss is called on cancel', function testImpl() {
    var modalInstanceDismissSpy = sinon.spy(fakeModalInstance, 'dismiss');
    controller.cancel();
    modalInstanceDismissSpy.calledWith('cancel').should.be.true;
  });
});
