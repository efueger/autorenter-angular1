var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');
require('./fleet-location-edit-strategy.factory');

describe('fa.fleet.fleetLocationEditStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var $state;
  var notificationService;
  var statesDataService;
  var locationsDataService;
  var fleetLocationEditStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _$state_,
                                        _notificationService_,
                                        _statesDataService_,
                                        _locationsDataService_,
                                        _fleetLocationEditStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    notificationService = _notificationService_;
    statesDataService = _statesDataService_;
    locationsDataService = _locationsDataService_;
    fleetLocationEditStrategy = _fleetLocationEditStrategy_;
  }));

  it.skip('getInitializationData returns state and location data', function testImpl() {
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
    fleetLocationEditStrategy.getInitializationData(location.id)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });

  it.skip('notifySuccess notifies user of successful update', function testImpl() {
    var notifySuccessSpy = sinon.spy(notificationService, 'notifySuccess');
    fleetLocationEditStrategy.notifySuccess('9876C');
    var actualNotificationArgs = notifySuccessSpy.getCall(0).args;
    var expectedNotificationArgs = [{ userMessage: 'Location \'9876C\' was updated successfully.'}];
    actualNotificationArgs.should.deep.equal(expectedNotificationArgs);
  });

  describe('save', function saveTest() {
    var siteId = '98765U';
    var location = {siteId: siteId};

    it.skip('persists the modified location', function testImpl() {
      var updateLocationSpy = sinon.spy(locationsDataService, 'updateLocation');
      fleetLocationEditStrategy.save(location);
      updateLocationSpy.calledWith(location).should.be.true;
    });

    it.skip('notifies user of successful update', function testImpl() {
      // Just stub it out to avoid the 'No more request expected' error.
      sinon.stub($state, 'go');
      var notifySuccessStub = sinon.stub(fleetLocationEditStrategy, 'notifySuccess');

      fleetLocationEditStrategy.save(location);
      $rootScope.$apply();

      notifySuccessStub.calledWith(siteId).should.be.true;
    });

    it.skip('navigates to the locations list', function testImpl() {
      // Just stub it out to avoid the 'No more request expected' error.
      sinon.stub(fleetLocationEditStrategy, 'notifySuccess');
      var goStub = sinon.stub($state, 'go');

      fleetLocationEditStrategy.save(location);
      $rootScope.$apply();

      goStub.calledWith('fleet.locations.list').should.be.true;
    });
  });
});
