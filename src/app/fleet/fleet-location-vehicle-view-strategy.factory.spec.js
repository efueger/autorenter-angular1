describe('fa.fleet.fleetLocationVehicleViewStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var fleetLocationVehicleEditStrategy;
  var fleetLocationVehicleViewStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _fleetLocationVehicleEditStrategy_,
                                        _fleetLocationVehicleViewStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    fleetLocationVehicleEditStrategy = _fleetLocationVehicleEditStrategy_;
    fleetLocationVehicleViewStrategy = _fleetLocationVehicleViewStrategy_;
  }));

  it.skip('getInitializationData returns state, location, year, make, model, and color data', function testImpl() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
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
      years: years
    };
    sinon.stub(fleetLocationVehicleEditStrategy, 'getInitializationData', function getInitializationData(vehicleId) {
      var deferred = $q.defer();
      if (vehicleId === vehicle.id) {
        deferred.resolve({
          vehicle: vehicle,
          location: location,
          years: years
        });
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationVehicleViewStrategy.getInitializationData(vehicle.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
