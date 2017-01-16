var angular = require('angular');
var sinon = require('sinon');
require('angular-mocks');
require('sinon-chai');

require('./fleet-location-vehicle-initialization.factory');

describe('fa.fleet.fleetLocationVehicleInitializationFactory > ', function describeImpl() {
  var $q;
  var $rootScope;
  var skuDataService;
  var lookupDataService;
  var locationsDataService;
  var vehiclesDataService;
  var fleetLocationVehicleInitializationFactory;

  var sinon = require('sinon');

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _skuDataService_,
                                        _lookupDataService_,
                                        _locationsDataService_,
                                        _vehiclesDataService_,
                                        _fleetLocationVehicleInitializationFactory_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    skuDataService = _skuDataService_;
    lookupDataService = _lookupDataService_;
    locationsDataService = _locationsDataService_;
    vehiclesDataService = _vehiclesDataService_;
    fleetLocationVehicleInitializationFactory = _fleetLocationVehicleInitializationFactory_;
  }));

  describe('getInitializationData', function describeImpl() {
    var location = {
      id: '1'
    };
    var vehicle = {
      id: 1,
      makeId: 'che',
      modelId: 'cvt'
    };
    var skus = [
      { makeId: 'tsl', modelId: 'tmx', year: 2016, color: 'Black' },
      { makeId: 'che', modelId: 'cvt', year: 2016, color: 'Black' }
    ];
    var selectedMake = { id: 'che', name: 'Chevrolet' };
    var makes = [
      { id: 'tsl', name: 'Tesla' },
      selectedMake
    ];
    var selectedModel = { id: 'cvt', name: 'Corvette' };
    var models = [
      { id: 'tmx', name: 'Model X' },
      selectedModel
    ];

    beforeEach(function beforeEachImpl() {
      sinon.stub(vehiclesDataService, 'getVehicle', function getVehicle(vehicleId) {
        var deferred = $q.defer();
        if (vehicleId === vehicle.id) {
          deferred.resolve({ data: { vehicle: vehicle } });
        } else {
          deferred.reject();
        }
        return deferred.promise;
      });
      sinon.stub(locationsDataService, 'getLocation', function getLocation(locationId) {
        var deferred = $q.defer();
        if (locationId === location.id) {
          deferred.resolve({ data: { location: location } });
        } else {
          deferred.reject();
        }
        return deferred.promise;
      });
      sinon.stub(skuDataService, 'getSkus', function getSkus() {
        var deferred = $q.defer();
        deferred.resolve({ data: { skus: skus } });
        return deferred.promise;
      });
      sinon.stub(lookupDataService, 'getVehicleLookupData', function getVehicleLookupData() {
        var deferred = $q.defer();
        deferred.resolve({
          data: {
            lookupData: {
              makes: makes,
              models: models
            }
          }
        });
        return deferred.promise;
      });
    });

    it('returns partial set of data', function testImpl() {
      var expectedResponse = {
        location: location,
        skus: skus,
        makes: makes,
        models: models
      };

      var actualResponse;
      fleetLocationVehicleInitializationFactory.getInitializationData(location.id)
        .then(function setResponse(response) {
          actualResponse = response;
        });
      $rootScope.$apply();

      actualResponse.should.deep.equal(expectedResponse);
    });

    it('returns full set of data', function testImpl() {
      var expectedResponse = {
        location: location,
        vehicle: vehicle,
        skus: skus,
        makes: makes,
        models: models,
        selectedMake: selectedMake,
        selectedModel: selectedModel
      };

      var actualResponse;
      fleetLocationVehicleInitializationFactory.getInitializationData(location.id, vehicle.id)
        .then(function setResponse(response) {
          actualResponse = response;
        });
      $rootScope.$apply();

      actualResponse.should.deep.equal(expectedResponse);
    });
  });
});
