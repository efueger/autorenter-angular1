var angular = require('angular');
require('angular-mocks');
require('sinon-chai');

require('./fleet-vehicle-property-synchronizer');

describe('fa.fleet.fleetVehiclePropertySynchronizer > ', function describeImpl() {
  var vehicle = {
    id: 1,
    makeId: 'che',
    modelId: 'cvt',
    year: 2017
  };
  var skus = [
    {makeId: 'tsl', modelId: 'tmx', year: 2017, color: 'Black'},
    {makeId: 'che', modelId: 'cvt', year: 2016, color: 'Black'},
    {makeId: 'che', modelId: 'cvt', year: 2017, color: 'Black'},
    {makeId: 'che', modelId: 'cvt', year: 2017, color: 'Red'}
  ];
  var expectedModel = {
    id: 'cvt',
    name: 'Corvette'
  };
  var models = [{
    id: 'tmx',
    name: 'Model X'
  },
    expectedModel
  ];
  var initializationData = {
    skus: skus,
    models: models
  };

  var fleetVehiclePropertySynchronizer;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_fleetVehiclePropertySynchronizer_) {
    fleetVehiclePropertySynchronizer = _fleetVehiclePropertySynchronizer_;
  }));

  describe('initialize', function initializeTest() {
    beforeEach(function prep() {
      fleetVehiclePropertySynchronizer.initialize(initializationData);
    });

    it('initializes the skus', function testImpl() {
      fleetVehiclePropertySynchronizer.cache.skus.should.eql(skus);
    });

    it('initializes the models', function testImpl() {
      fleetVehiclePropertySynchronizer.cache.models.should.eql(models);
    });
  });

  describe('getSynchronizedData', function getSynchronizedDataTest() {
    var actualResult;
    beforeEach(function prep() {
      fleetVehiclePropertySynchronizer.initialize(initializationData);
    });

    describe('returns expected empty result', function emptyResultTest() {
      var emptyResult = {
        models: [],
        years: [],
        colors: []
      };

      it('if vehicle is not specified', function testImpl() {
        actualResult = fleetVehiclePropertySynchronizer.getSynchronizedData();
        actualResult.should.eql(emptyResult);
      });

      it('if makeId is not specified', function testImpl() {
        actualResult = fleetVehiclePropertySynchronizer.getSynchronizedData({});
        actualResult.should.eql(emptyResult);
      });
    });

    describe('if makeId is specified', function makeIdIsSpecifiedTest() {
      beforeEach(function prep() {
        actualResult = fleetVehiclePropertySynchronizer.getSynchronizedData(vehicle);
      });

      it('returns the expected models', function testImpl() {
        actualResult.models.should.eql([expectedModel]);
      });

      it('returns the expected years', function testImpl() {
        actualResult.years.should.eql([2016, 2017]);
      });

      it('returns the expected colors', function testImpl() {
        actualResult.colors.should.eql(['Black', 'Red']);
      });
    });
  });
});
