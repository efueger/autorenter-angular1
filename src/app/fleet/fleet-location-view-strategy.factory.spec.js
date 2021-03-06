var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');
require('./fleet-location-view-strategy.factory');

describe('fa.fleet.fleetLocationViewStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var fleetLocationInitializationFactory;
  var fleetLocationViewStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _fleetLocationInitializationFactory_,
                                        _fleetLocationViewStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    fleetLocationInitializationFactory = _fleetLocationInitializationFactory_;
    fleetLocationViewStrategy = _fleetLocationViewStrategy_;
  }));

  it('getInitializationData returns state, location, and selectedState data', function testImpl() {
    var states = [
      {
        'stateCode': 'IL',
        'name': 'Illinois'
      },
      {
        'stateCode': 'IN',
        'name': 'Indiana'
      }
    ];
    var location = {
      id: '1',
      siteId: 'ind',
      name: 'Indianapolis International Airport',
      vehicleCount: 255,
      city: 'Indianapolis',
      stateCode: 'IN'
    };
    var selectedState = {
      'stateCode': 'IN',
      'name': 'Indiana'
    };
    var expectedResponse = {
      states: states,
      location: location,
      selectedState: selectedState
    };
    sinon.stub(fleetLocationInitializationFactory, 'getInitializationData', function getInitializationData(locationId) {
      var deferred = $q.defer();
      if (locationId === location.id) {
        deferred.resolve({
          states: states,
          location: location,
          selectedState: selectedState
        });
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationViewStrategy.getInitializationData(location.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
