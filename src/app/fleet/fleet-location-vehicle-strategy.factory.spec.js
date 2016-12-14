var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');

require('./fleet-location-vehicle-strategy.factory');

describe('fa.fleet.fleetLocationVehicleStrategyFactory > ', function describeImpl() {
  var fleetLocationVehicleDetailsModeService;
  var fleetLocationVehicleStrategyFactory;
  var isAddModeStub;
  var isEditModeStub;
  var isViewModeStub;

  var fleetLocationVehicleViewStrategy;
  var fleetLocationVehicleEditStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_fleetLocationVehicleDetailsModeService_,
                                        _fleetLocationVehicleViewStrategy_,
                                        _fleetLocationVehicleEditStrategy_,
                                        _fleetLocationVehicleStrategyFactory_) {
    fleetLocationVehicleDetailsModeService = _fleetLocationVehicleDetailsModeService_;
    fleetLocationVehicleViewStrategy = _fleetLocationVehicleViewStrategy_;
    fleetLocationVehicleEditStrategy = _fleetLocationVehicleEditStrategy_;
    fleetLocationVehicleStrategyFactory = _fleetLocationVehicleStrategyFactory_;

    isAddModeStub = sinon.stub(fleetLocationVehicleDetailsModeService, 'isAddMode');
    isEditModeStub = sinon.stub(fleetLocationVehicleDetailsModeService, 'isEditMode');
    isViewModeStub = sinon.stub(fleetLocationVehicleDetailsModeService, 'isViewMode');
  }));

  describe('getStrategy', function getStrategyTest() {
    it('returns View strategy if in View mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(false);
      isViewModeStub.returns(true);

      var strategy = fleetLocationVehicleStrategyFactory.getStrategy();
      strategy.should.equal(fleetLocationVehicleViewStrategy);
    });

    it('returns Edit strategy if in View mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(true);
      isViewModeStub.returns(false);

      var strategy = fleetLocationVehicleStrategyFactory.getStrategy();
      strategy.should.equal(fleetLocationVehicleEditStrategy);
    });

    it('throws exception if in unsupported mode', function testImpl() {
      var getNavigationStateNameStub = sinon.stub(fleetLocationVehicleDetailsModeService, 'getNavigationStateName');
      getNavigationStateNameStub.returns('foo');
      var actualMessage;
      var expectedMessage = 'Unsupported mode for navigation state \'foo\'.';
      isAddModeStub.returns(false);
      isEditModeStub.returns(false);
      isViewModeStub.returns(false);

      try {
        fleetLocationVehicleStrategyFactory.getStrategy();
      } catch (ex) {
        actualMessage = ex.message;
      }

      actualMessage.should.equal(expectedMessage);
    });
  });
});
