var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');

require('./fleet-location-vehicle-edit-strategy.factory');

describe('fa.fleet.fleetLocationVehicleEditStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var fleetLocationVehicleEditStrategy;
  var fleetLocationVehicleInitializationFactory;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _$state_,
                                        _fleetLocationVehicleEditStrategy_,
                                        _fleetLocationVehicleInitializationFactory_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    fleetLocationVehicleEditStrategy = _fleetLocationVehicleEditStrategy_;
    fleetLocationVehicleInitializationFactory = _fleetLocationVehicleInitializationFactory_;
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
    sinon.stub(fleetLocationVehicleInitializationFactory, 'getInitializationData', function getInitializationData(locationId, vehicleId) {
      var deferred = $q.defer();
      if (locationId === location.id && vehicleId === vehicle.id) {
        deferred.resolve({
          vehicle: vehicle,
          location: location,
          years: years,
          colors: colors,
          makes: makes,
          models: models
        });
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationVehicleEditStrategy.getInitializationData(location.id, vehicle.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
