describe('fa.fleet.fleetLocationVehicleEditStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var vehiclesDataService;
  var locationsDataService;
  var fleetLocationVehicleEditStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _$state_,
                                        _vehiclesDataService_,
                                        _locationsDataService_,
                                        _fleetLocationVehicleEditStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    vehiclesDataService = _vehiclesDataService_;
    locationsDataService = _locationsDataService_;
    fleetLocationVehicleEditStrategy = _fleetLocationVehicleEditStrategy_;
  }));

  it('getInitializationData returns vehicle and location data', function testImpl() {
    var vehicle = {
      id: 'ab',
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
    var expectedResponse = {
      vehicle: vehicle,
      location: location
    };
    sinon.stub(vehiclesDataService, 'getVehicle', function getVehicle() {
      var deferred = $q.defer();
      deferred.resolve({data: vehicle});
      return deferred.promise;
    });
    sinon.stub(locationsDataService, 'getLocationByVehicleId', function getLocationByVehicleId() {
      var deferred = $q.defer();
      deferred.resolve({data: location});
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationVehicleEditStrategy.getInitializationData(vehicle.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
