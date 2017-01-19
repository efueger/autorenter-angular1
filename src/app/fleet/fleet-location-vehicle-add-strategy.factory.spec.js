var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');

require('./fleet-location-vehicle-add-strategy.factory');

describe('fa.fleet.fleetLocationVehicleAddStrategy > ', function describeImpl() {
  var $q;
  var $rootScope;
  var $state;
  var notificationService;
  var fleetLocationVehicleInitializationFactory;
  var vehiclesDataService;
  var fleetLocationVehicleAddStrategy;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _$state_,
                                        _notificationService_,
                                        _fleetLocationVehicleInitializationFactory_,
                                        _vehiclesDataService_,
                                        _fleetLocationVehicleAddStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    notificationService = _notificationService_;
    fleetLocationVehicleInitializationFactory = _fleetLocationVehicleInitializationFactory_;
    vehiclesDataService = _vehiclesDataService_;
    fleetLocationVehicleAddStrategy = _fleetLocationVehicleAddStrategy_;
  }));

  it('getInitializationData returns vehicle and location data', function testImpl() {
    var dummyInitializationData = {
      theActualValues: 'do not matter for this test'
    };
    var locationIdUsedInInvocation = 'foo';
    sinon.stub(fleetLocationVehicleInitializationFactory, 'getInitializationData', function getInitializationData(locationId) {
      var deferred = $q.defer();
      if (locationId === locationIdUsedInInvocation) {
        deferred.resolve(dummyInitializationData);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });
    var expectedResponse = dummyInitializationData;

    var actualResponse;
    fleetLocationVehicleAddStrategy.getInitializationData(locationIdUsedInInvocation)
      .then(function setResponse(response) {
        actualResponse = response;
      });
    $rootScope.$apply();

    actualResponse.should.deep.equal(expectedResponse);
  });

  it('notifySuccess notifies user of successful add', function testImpl() {
    var notifySuccessSpy = sinon.spy(notificationService, 'notifySuccess');
    fleetLocationVehicleAddStrategy.notifySuccess('9876C');
    var actualNotificationArgs = notifySuccessSpy.getCall(0).args;
    var expectedNotificationArgs = [{ userMessage: 'Vehicle \'9876C\' was added successfully.'}];
    actualNotificationArgs.should.deep.equal(expectedNotificationArgs);
  });

  describe('save', function saveTest() {
    var vehicleId = 1000;
    var vehicle = {id: vehicleId, vin: '67012FD65DSA12349'};

    it('persists the new vehicle', function testImpl() {
      var addVehicleSpy = sinon.spy(vehiclesDataService, 'addVehicleToLocation');
      fleetLocationVehicleAddStrategy.save(location.id, vehicle);
      addVehicleSpy.calledWith(location.id, vehicle).should.be.true;
    });

    it('notifies user of successful add', function testImpl() {
      sinon.stub($state, 'go');
      sinon.stub(vehiclesDataService, 'addVehicleToLocation', function addVehicleToLocation() {
        var deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      });
      var notifySuccessStub = sinon.stub(fleetLocationVehicleAddStrategy, 'notifySuccess');

      fleetLocationVehicleAddStrategy.save(location.id, vehicle);
      $rootScope.$apply();

      notifySuccessStub.calledWith(vehicle.vin).should.be.true;
    });

    it('navigates to the vehicles list', function testImpl() {
      sinon.stub(fleetLocationVehicleAddStrategy, 'notifySuccess');
      sinon.stub(vehiclesDataService, 'addVehicleToLocation', function addVehicleToLocation() {
        var deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      });
      var goStub = sinon.stub($state, 'go');

      fleetLocationVehicleAddStrategy.save(location.id, vehicle);
      $rootScope.$apply();

      goStub.calledWith('fleet.locations.vehicles').should.be.true;
    });
  });
});
