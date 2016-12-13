describe('fa.fleet.FleetLocationVehicleDetailsController > ', function describeImpl() {
  var $q;
  var $rootScope;
  var $state;
  var fleetLocationVehicleStrategyFactory;
  var implementationStrategy;
  var fleetLocationVehicleDetailsModeService;
  var controller;

  var vehicle = {
    id: 1,
    vin: '1XKDPB0X04R047346',
    make: 'Toyota',
    model: 'Tercel',
    year: 1990,
    miles: 452303,
    color: 'Gold',
    isRentToOwn: false,
  };
  var location = {
    id: '1',
    siteId: 'ind',
    name: 'Indianapolis International Airport',
    vehicleCount: 255,
    city: 'Indianapolis',
    stateCode: 'IN'
  };

  var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
  var colors = ['Black', 'Blue', 'Gold', 'Orange', 'Red', 'Silver'];
  var models = [ 'Civic', 'Impala', 'Pinto', 'Tercel'];
  var makes = ['Chevrolet', 'Ford', 'Honda', 'Toyota'];

  var initializationData = {
    vehicle: vehicle,
    location: location,
    years: years,
    colors: colors,
    makes: makes,
    models: models
  };

  var navigationState = { vehicleId: '1000', locationId: 'fooßar'};

  var getInitializationDataStub;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _fleetLocationVehicleStrategyFactory_,
                                        _fleetLocationVehicleDetailsModeService_,
                                        _fleetLocationVehicleEditStrategy_) {
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

    getInitializationDataStub = sinon.stub(
      implementationStrategy,
      'getInitializationData',
      function getInitializationData() {
        var deferred = $q.defer();
        deferred.resolve(initializationData);
        return deferred.promise;
      }
    );

    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('FleetLocationVehicleDetailsController', {
          '$state': $state,
          'fleetLocationVehicleStrategyFactory': fleetLocationVehicleStrategyFactory,
          'fleetLocationVehicleDetailsModeService': fleetLocationVehicleDetailsModeService
        });
      }
    ]);

    // Run the controller initialization function...
    $rootScope.$apply();
  }));

  describe('initialize', function initializeTest() {
    it('calls getInitializationData with correct arguments', function testImpl() {
      getInitializationDataStub.calledWith(parseInt(navigationState.vehicleId, 10), navigationState.locationId).should.be.true;
    });

    it('sets the correct location', function testImpl() {
      controller.location.should.deep.equal(initializationData.location);
    });

    it('sets the correct vehicle', function testImpl() {
      controller.vehicle.should.deep.equal(initializationData.vehicle);
    });

    it('sets the correct years', function testImpl() {
      controller.years.should.deep.equal(initializationData.years);
    });

    it('sets the correct makes', function testImpl() {
      controller.makes.should.deep.equal(initializationData.makes);
    });

    it('sets the correct models', function testImpl() {
      controller.models.should.deep.equal(initializationData.models);
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
    saveSpy.calledWith(initializationData.vehicle).should.be.true;
  });
});
