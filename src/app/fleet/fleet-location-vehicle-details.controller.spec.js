var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');

require('./fleet-location-vehicle-details.controller');
require('./fleet-vehicle-property-synchronizer');

describe('fa.fleet.FleetLocationVehicleDetailsController > ', function describeImpl() {
  var $q;
  var $rootScope;
  var $state;
  var fleetLocationVehicleStrategyFactory;
  var implementationStrategy;
  var fleetLocationVehicleDetailsModeService;
  var controller;

  var vehicle = {id: 1};
  var location = {id: '1'};
  var selectedMake = { id: 'che', name: 'Chevrolet' };
  var makes = [
    { id: 'tsl', name: 'Tesla' },
    selectedMake
  ];
  var selectedModel = { id: 'cvt', name: 'Corvette' };
  var models = [
    { id: 'tmx', name: 'Model X' },
    selectedModel
  ];
  var years = [2016, 2017];
  var colors = ['Black', 'Red', 'Silver'];
  var initializationData = {
    vehicle: vehicle,
    location: location,
    makes: makes,
    selectedMake: selectedMake,
    selectedModel: selectedModel
  };

  var navigationState = { vehicleId: '1000', locationId: 'fooßar'};

  var getInitializationDataStub;
  var synchronizerInitializerSpy;
  var getSynchronizedDataStub;

  beforeEach(angular.mock.module('fa.fleet'));
  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _fleetLocationVehicleStrategyFactory_,
                                        _fleetLocationVehicleDetailsModeService_,
                                        _fleetLocationVehicleEditStrategy_,
                                        _fleetVehiclePropertySynchronizer_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    fleetLocationVehicleStrategyFactory = _fleetLocationVehicleStrategyFactory_;
    fleetLocationVehicleDetailsModeService = _fleetLocationVehicleDetailsModeService_;
    implementationStrategy = _fleetLocationVehicleEditStrategy_;

    $state = {
      params: {
        vehicleId: navigationState.vehicleId,
        locationId: navigationState.locationId
      }
    };

    // We return a known strategy so that
    //  1) the controller is initialized correctly, and
    //  2) we can create stubs and spies based on it.
    fleetLocationVehicleStrategyFactory.getStrategy = function getStrategy() {
      return implementationStrategy;
    };

    getInitializationDataStub = sinon.stub(implementationStrategy, 'getInitializationData',
      function getInitializationData() {
        var deferred = $q.defer();
        deferred.resolve(initializationData);
        return deferred.promise;
      }
    );

    synchronizerInitializerSpy = sinon.spy(_fleetVehiclePropertySynchronizer_, 'initialize');
    getSynchronizedDataStub = sinon.stub(_fleetVehiclePropertySynchronizer_, 'getSynchronizedData',
      function getSynchronizedData(actualVehicle)  {
        return (actualVehicle.id === vehicle.id) ? { models: models, years: years, colors: colors } : null;
      });

    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('FleetLocationVehicleDetailsController', {
          '$state': $state,
          'fleetLocationVehicleStrategyFactory': fleetLocationVehicleStrategyFactory,
          'fleetLocationVehicleDetailsModeService': fleetLocationVehicleDetailsModeService,
          'fleetVehiclePropertySynchronizer': _fleetVehiclePropertySynchronizer_
        });
      }
    ]);

    // Run the controller initialization function...
    $rootScope.$apply();
  }));

  describe('initialize', function initializeTest() {
    it('calls getInitializationData with correct arguments', function testImpl() {
      getInitializationDataStub.calledWith(navigationState.locationId, navigationState.vehicleId).should.be.true;
    });

    it('sets the correct location', function testImpl() {
      controller.location.should.deep.equal(initializationData.location);
    });

    it('sets the correct vehicle', function testImpl() {
      controller.vehicle.should.deep.equal(initializationData.vehicle);
    });

    it('sets the correct makes', function testImpl() {
      controller.makes.should.deep.equal(initializationData.makes);
    });

    it('sets the selected make', function testImpl() {
      controller.selectedMake.should.deep.equal(initializationData.selectedMake);
    });

    it('sets the selected model', function testImpl() {
      controller.selectedModel.should.deep.equal(initializationData.selectedModel);
    });

    it('initializes the synchronizer', function testImpl() {
      synchronizerInitializerSpy.calledWith(initializationData).should.be.true;
    });

    describe('calls synchLookups and', function synchLookupsTest() {
      it('synchronizes the lookup data', function testImpl() {
        getSynchronizedDataStub.calledWith(vehicle).should.be.true;
      });

      it('sets the models', function testImpl() {
        controller.models.should.deep.equal(models);
      });

      it('sets the years', function testImpl() {
        controller.years.should.deep.equal(years);
      });

      it('sets the colors', function testImpl() {
        controller.colors.should.deep.equal(colors);
      });
    });
  });

  describe('isEditable', function isEditableTest() {
    var isAddModeStub;
    var isEditModeStub;

    beforeEach(function beforeEach() {
      isAddModeStub = sinon.stub(fleetLocationVehicleDetailsModeService, 'isAddMode');
      isEditModeStub = sinon.stub(fleetLocationVehicleDetailsModeService, 'isEditMode');
    });

    it('returns true if is in Edit mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(true);
      controller.isEditable().should.be.true;
    });

    it('returns true if is in Add mode', function testImpl() {
      isAddModeStub.returns(true);
      isEditModeStub.returns(false);
      controller.isEditable().should.be.true;
    });

    it('returns false if is not in Add or Edit mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(false);
      controller.isEditable().should.be.false;
    });
  });

  it('save saves the correct vehicle', function testImpl() {
    var saveSpy = sinon.spy(implementationStrategy, 'save');
    controller.save();
    saveSpy.calledWith(location.id, initializationData.vehicle).should.be.true;
  });
});
