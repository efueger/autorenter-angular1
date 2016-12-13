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

  it.skip('getInitializationData returns vehicle and location data', function testImpl() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    var colors = ['Black', 'Blue', 'Gold', 'Orange', 'Red', 'Silver'];
    var models = [ 'Civic', 'Impala', 'Pinto', 'Tercel'];
    var makes = ['Chevrolet', 'Ford', 'Honda', 'Toyota'];
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
    var expectedResponse = {
      vehicle: vehicle,
      location: location,
      years: years,
      colors: colors,
      makes: makes,
      models: models
    };
    sinon.stub(vehiclesDataService, 'getVehicle', function getVehicle() {
      var deferred = $q.defer();
      deferred.resolve({data: vehicle});
      return deferred.promise;
    });
    sinon.stub(locationsDataService, 'getLocation', function getLocation() {
      var deferred = $q.defer();
      deferred.resolve({data: location});
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationVehicleEditStrategy.getInitializationData(vehicle.id, location.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
