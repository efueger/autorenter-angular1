require('./fleet-location-strategy-factory.factory');

describe('fa.fleet.fleetLocationStrategyFactory > ', function describeImpl() {
  var fleetLocationDetailsModeService;
  var fleetLocationStrategyFactory;
  var isAddModeStub;
  var isEditModeStub;
  var isViewModeStub;

  var fleetLocationAddStrategy;
  var fleetLocationEditStrategy;
  var fleetLocationViewStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_fleetLocationDetailsModeService_,
                                        _fleetLocationAddStrategy_,
                                        _fleetLocationEditStrategy_,
                                        _fleetLocationViewStrategy_,
                                        _fleetLocationStrategyFactory_) {
    fleetLocationDetailsModeService = _fleetLocationDetailsModeService_;
    fleetLocationAddStrategy = _fleetLocationAddStrategy_;
    fleetLocationEditStrategy = _fleetLocationEditStrategy_;
    fleetLocationViewStrategy = _fleetLocationViewStrategy_;
    fleetLocationStrategyFactory = _fleetLocationStrategyFactory_;

    isAddModeStub = sinon.stub(fleetLocationDetailsModeService, 'isAddMode');
    isEditModeStub = sinon.stub(fleetLocationDetailsModeService, 'isEditMode');
    isViewModeStub = sinon.stub(fleetLocationDetailsModeService, 'isViewMode');
  }));

  describe('getStrategy', function getStrategyTest() {
    it.skip('returns Add strategy if in Add mode', function testImpl() {
      isAddModeStub.returns(true);
      isEditModeStub.returns(false);
      isViewModeStub.returns(false);

      var strategy = fleetLocationStrategyFactory.getStrategy();
      strategy.should.equal(fleetLocationAddStrategy);
    });

    it.skip('returns Edit strategy if in Edit mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(true);
      isViewModeStub.returns(false);

      var strategy = fleetLocationStrategyFactory.getStrategy();
      strategy.should.equal(fleetLocationEditStrategy);
    });

    it.skip('returns View strategy if in View mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(false);
      isViewModeStub.returns(true);

      var strategy = fleetLocationStrategyFactory.getStrategy();
      strategy.should.equal(fleetLocationViewStrategy);
    });

    it.skip('throws exception if in unsupported mode', function testImpl() {
      var getNavigationStateNameStub = sinon.stub(fleetLocationDetailsModeService, 'getNavigationStateName');
      getNavigationStateNameStub.returns('foo');
      var actualMessage;
      var expectedMessage = 'Unsupported mode for navigation state \'foo\'.';
      isAddModeStub.returns(false);
      isEditModeStub.returns(false);
      isViewModeStub.returns(false);

      try {
        fleetLocationStrategyFactory.getStrategy();
      } catch (ex) {
        actualMessage = ex.message;
      }

      actualMessage.should.equal(expectedMessage);
    });
  });
});
