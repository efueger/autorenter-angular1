require('./fleet-location-vehicle-initialization.factory');

describe('fa.fleet.fleetLocationVehicleInitialization > ', function describeImpl() {
  var $q;
  var $rootScope;
  var locationsDataService;
  var vehiclesDataService;
  var fleetLocationVehicleInitialization;

  var sinon = require('sinon');

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _locationsDataService_,
                                        _vehiclesDataService_,
                                        _fleetLocationVehicleInitialization_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    locationsDataService = _locationsDataService_;
    vehiclesDataService = _vehiclesDataService_;
    fleetLocationVehicleInitialization = _fleetLocationVehicleInitialization_;
  }));

  it('getInitializationData returns vehicle and location data', function testImpl() {
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
      isRentToOwn: false
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
      deferred.resolve({data: {vehicle: vehicle}});
      return deferred.promise;
    });
    sinon.stub(locationsDataService, 'getLocation', function getLocation() {
      var deferred = $q.defer();
      deferred.resolve({data: {location: location}});
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationVehicleInitialization.getInitializationData(location.id, vehicle.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
