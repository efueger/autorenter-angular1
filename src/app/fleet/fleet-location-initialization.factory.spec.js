require('./fleet-location-initialization.factory');

describe('fa.fleet.fleetLocationInitializationFactory > ', function describeImpl() {
  var $q;
  var $rootScope;
  var lookupDataService;
  var locationsDataService;
  var fleetLocationInitializationFactory;

  var sinon = require('sinon');

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _lookupDataService_,
                                        _locationsDataService_,
                                        _fleetLocationInitializationFactory_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    lookupDataService = _lookupDataService_;
    locationsDataService = _locationsDataService_;
    fleetLocationInitializationFactory = _fleetLocationInitializationFactory_;
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
    var selectedState = {
      'stateCode': 'IN',
      'name': 'Indiana'
    };
    var expectedResponse = {
      states: states,
      location: location,
      selectedState: selectedState
    };
    sinon.stub(lookupDataService, 'getStates', function getStates() {
      var deferred = $q.defer();
      deferred.resolve({data: {states: states}});
      return deferred.promise;
    });
    sinon.stub(locationsDataService, 'getLocation', function getLocation(locationId) {
      var deferred = $q.defer();
      if (locationId === location.id) {
        deferred.resolve({data: {location: location}});
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationInitializationFactory.getInitializationData(location.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });
});
