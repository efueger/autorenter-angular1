require('./fleet-location-initialization.factory');

describe('fa.fleet.fleetLocationInitialization > ', function describeImpl() {
  var $q;
  var $rootScope;
  var statesDataService;
  var locationsDataService;
  var fleetLocationInitialization;

  var sinon = require('sinon');

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _statesDataService_,
                                        _locationsDataService_,
                                        _fleetLocationInitialization_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    statesDataService = _statesDataService_;
    locationsDataService = _locationsDataService_;
    fleetLocationInitialization = _fleetLocationInitialization_;
  }));

  it('getInitializationData returns state and location data', function testImpl() {
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
    var expectedResponse = {
      states: states,
      location: location
    };
    sinon.stub(statesDataService, 'getStates', function getStates() {
      var deferred = $q.defer();
      deferred.resolve({data: states});
      return deferred.promise;
    });
    sinon.stub(locationsDataService, 'getLocation', function getLocation(locationId) {
      var deferred = $q.defer();
      if (locationId === location.id) {
        deferred.resolve({data: location});
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationInitialization.getInitializationData(location.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
