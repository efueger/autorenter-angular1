var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');
require('./fleet-location-add-strategy.factory');

describe('fa.fleet.fleetLocationAddStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var $state;
  var notificationService;
  var statesDataService;
  var locationsDataService;
  var fleetLocationAddStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _$state_,
                                        _notificationService_,
                                        _statesDataService_,
                                        _locationsDataService_,
                                        _fleetLocationAddStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    notificationService = _notificationService_;
    statesDataService = _statesDataService_;
    locationsDataService = _locationsDataService_;
    fleetLocationAddStrategy = _fleetLocationAddStrategy_;
  }));

  it('getInitializationData returns states', function testImpl() {
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
    var expectedResponse = {states: states};
    sinon.stub(statesDataService, 'getStates', function getStates() {
      var deferred = $q.defer();
      deferred.resolve({data: states});
      return deferred.promise;
    });

    var actualResponse;
    fleetLocationAddStrategy.getInitializationData()
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });

  it('notifySuccess notifies user of successful add', function testImpl() {
    var notifySuccessSpy = sinon.spy(notificationService, 'notifySuccess');
    fleetLocationAddStrategy.notifySuccess('9876C');
    var actualNotificationArgs = notifySuccessSpy.getCall(0).args;
    var expectedNotificationArgs = [{ userMessage: 'Location \'9876C\' was added successfully.'}];
    actualNotificationArgs.should.deep.equal(expectedNotificationArgs);
  });

  describe('save', function saveTest() {
    var siteId = '98765U';
    var location = {siteId: siteId};

    it('persists the new location', function testImpl() {
      var addLocationSpy = sinon.spy(locationsDataService, 'addLocation');
      fleetLocationAddStrategy.save(location);
      addLocationSpy.calledWith(location).should.be.true;
    });

    it('notifies user of successful add', function testImpl() {
      // Just stub it out to avoid the 'No more request expected' error.
      sinon.stub($state, 'go');
      var notifySuccessStub = sinon.stub(fleetLocationAddStrategy, 'notifySuccess');

      fleetLocationAddStrategy.save(location);
      $rootScope.$apply();

      notifySuccessStub.calledWith(siteId).should.be.true;
    });

    it('navigates to the locations list', function testImpl() {
      // Just stub it out to avoid the 'No more request expected' error.
      sinon.stub(fleetLocationAddStrategy, 'notifySuccess');
      var goStub = sinon.stub($state, 'go');

      fleetLocationAddStrategy.save(location);
      $rootScope.$apply();

      goStub.calledWith('fleet.locations.list').should.be.true;
    });
  });
});
