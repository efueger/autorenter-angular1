var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');

require('./fleet-location-vehicle-view-strategy.factory');

describe('fa.fleet.fleetLocationVehicleViewStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var fleetLocationVehicleInitializationFactory;
  var fleetLocationVehicleViewStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _fleetLocationVehicleInitializationFactory_,
                                        _fleetLocationVehicleViewStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    fleetLocationVehicleInitializationFactory = _fleetLocationVehicleInitializationFactory_;
    fleetLocationVehicleViewStrategy = _fleetLocationVehicleViewStrategy_;
  }));

  it('getInitializationData returns vehicle and location data', function testImpl() {
    var dummyInitializationData = {
      theActualValues: 'do not matter for this test'
    };
    var locationIdUsedInInvocation = 'foo';
    var vehicleIdUsedInInvocation = 'bar';
    sinon.stub(fleetLocationVehicleInitializationFactory, 'getInitializationData', function getInitializationData(locationId, vehicleId) {
      var deferred = $q.defer();
      if (locationId === locationIdUsedInInvocation && vehicleId === vehicleIdUsedInInvocation) {
        deferred.resolve(dummyInitializationData);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });
    var expectedResponse = dummyInitializationData;

    var actualResponse;
    fleetLocationVehicleViewStrategy.getInitializationData(locationIdUsedInInvocation, vehicleIdUsedInInvocation)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
