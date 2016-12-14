require('./fleet-location-vehicles.controller');
var fleetLocationVehiclesIdColumnTemplate = require('./fleet-location-vehicles-id-column.html');
var fleetLocationVehiclesRentToOwnColumnTemplate = require('./fleet-location-vehicles-rent-to-own-column.html');
var fleetLocationVehiclesActionsColumnTemplate = require('./fleet-location-vehicles-actions-column.html');

describe('fa.fleet.FleetVehiclesController > ', function describeImpl() {
  var $q;
  var $state;
  var $rootScope;
  var vehiclesDataService;
  var locationsDataService;
  var confirmationService;
  var controller;

  var vehicle = {
    id: 1,
    vin: '1XKDPB0X04R047346'
  };
  var location = {
    id: '1',
    siteId: 'ind',
    name: 'Indianapolis International Airport',
    vehicleCount: 255,
    city: 'Indianapolis',
    stateCode: 'IN'
  };

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_, _$rootScope_, _$state_, _vehiclesDataService_, _locationsDataService_, _confirmationService_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    vehiclesDataService = _vehiclesDataService_;
    locationsDataService = _locationsDataService_;
    confirmationService = _confirmationService_;

    $state = {
      params: {
        locationId: '1'
      }
    };

    locationsDataService.getLocation = function getLocation() {
      var deferred = $q.defer();
      deferred.resolve({data: location});
      return deferred.promise;
    };

    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('FleetVehiclesController', {
          '$state': $state,
          'vehiclesDataService': vehiclesDataService,
          'locationsDataService': locationsDataService,
          'confirmationService': confirmationService
        });
      }
    ]);

    confirmationService.show = function show() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    };
    vehiclesDataService.deleteVehicle = function deleteVehicle() {
      return $q.when();
    };
  }));

  describe('delete', function deleteTest() {
    beforeEach(function beforeEachImpl() {
      controller.populateGrid = function populateGrid() {
      };
    });

    it('asks user to confirm the action', function testImpl() {
      var showSpy = sinon.spy(confirmationService, 'show');

      controller.deleteVehicle(vehicle);
      $rootScope.$apply();

      var expectedMessage = "Delete vehicle '1XKDPB0X04R047346'?"; // eslint-disable-line quotes
      showSpy.getCall(0).args[0].should.equal(expectedMessage);
    });

    it('should delete an existing record if user confirms', function testImpl() {
      var deleteVehicleSpy = sinon.spy(vehiclesDataService, 'deleteVehicle');
      controller.deleteVehicle(vehicle);
      $rootScope.$apply();

      deleteVehicleSpy.calledWith(vehicle.id).should.be.true;
    });

    it('should repopulate the grid if user confirms', function testImpl() {
      var populateGridSpy = sinon.spy(controller, 'populateGrid');
      controller.deleteVehicle(vehicle);
      $rootScope.$apply();

      populateGridSpy.called.should.be.true;
    });

    it('should not delete an existing record if user cancels', function testImpl() {
      confirmationService.show = function show() {
        var deferred = $q.defer();
        deferred.reject();
        return deferred.promise;
      };

      var deleteVehicleSpy = sinon.spy(vehiclesDataService, 'deleteVehicle');
      controller.deleteVehicle(vehicle);
      $rootScope.$apply();

      deleteVehicleSpy.called.should.be.false;
    });
  });

  describe('initialize', function initializeImpl() {
    it('should initialize gridOptions.flatEntityAccess', function testImpl() {
      controller.gridOptions.flatEntityAccess.should.be.true;
    });

    it('should initialize gridOptions.enableColumnResizing', function testImpl() {
      controller.gridOptions.enableColumnResizing.should.be.true;
    });

    it('should initialize gridOptions.enableColumnMenus', function testImpl() {
      controller.gridOptions.enableColumnMenus.should.be.false;
    });

    it('should initialize gridOptions.columnDefs', function testImpl() {
      var columnDefs = controller.getColumnDefs();
      controller.gridOptions.columnDefs.should.deep.equal(columnDefs);
    });

    it('should initialize gridOptions.onRegisterApi', function testImpl() {
      var onRegisterGridApiName = controller.onRegisterGridApi.name;
      controller.gridOptions.onRegisterApi.name.should.equal(onRegisterGridApiName);
    });

    it('should initialize self.location', function testImpl() {
      $rootScope.$apply();
      controller.location.should.deep.equal(location);
    });
  });

  it('initializeLocation initializes self.location', function testImpl() {
    var expectedLocation = {id: 'abc123'};
    sinon.stub(locationsDataService, 'getLocation', function getLocation(locationId) {
      var deferred = $q.defer();
      deferred.resolve(locationId === expectedLocation.id ? {data: expectedLocation} : {});
      return deferred.promise;
    });
    controller.initializeLocation(expectedLocation.id);
    $rootScope.$apply();
    controller.location.should.deep.equal(expectedLocation);
  });

  it('getColumnDefs should return expected data', function testImpl() {
    var expectedColumnDefs = [
      {
        displayName: 'VIN',
        field: 'vin',
        type: 'string',
        enableSorting: true,
        suppressRemoveSort: true,
        sort: {
          priority: 0,
          direction: 'asc'
        },
        cellTemplate: fleetLocationVehiclesIdColumnTemplate
      },
      {
        displayName: 'Make',
        field: 'make',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Model',
        field: 'model',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Year',
        field: 'year',
        type: 'number',
        enableSorting: false
      },
      {
        displayName: 'Miles',
        field: 'miles',
        type: 'number',
        enableSorting: false
      },
      {
        displayName: 'Color',
        field: 'color',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Rent to Own',
        field: 'isRentToOwn',
        type: 'boolean',
        enableSorting: false,
        cellTemplate: fleetLocationVehiclesRentToOwnColumnTemplate
      },
      {
        displayName: 'Actions',
        width: 200,
        field: 'id',
        enableSorting: false,
        cellTemplate: fleetLocationVehiclesActionsColumnTemplate
      }
    ];

    var actualColumnDefs = controller.getColumnDefs();
    actualColumnDefs.should.deep.equal(expectedColumnDefs);
  });

  it('onRegisterGridApi should populate grid', function testImpl() {
    var populateFunctionWasInvoked;
    controller.populateGrid = function populateGrid() {
      populateFunctionWasInvoked = false;
    };

    controller.onRegisterGridApi();
    populateFunctionWasInvoked.should.be.false;
  });

  it('populateGrid should set grid data', function testImpl() {
    var vehicles = [
      {
        id: 1,
        vin: '1XKDPB0X04R047346',
        make: 'Toyota',
        model: 'Tercel',
        year: 1990,
        miles: 452303,
        color: 'Gold',
        rentToOwn: false
      },
      {
        id: 2,
        vin: '1HVLPHXM4GHA52708',
        make: 'Honda',
        model: 'Civic',
        year: 1994,
        miles: 282563,
        color: 'Silver',
        rentToOwn: false
      }];
    var expectedData = [vehicles];
    vehiclesDataService.getVehicles = function getVehicles() {
      var deferred = $q.defer();
      deferred.resolve({data: expectedData});
      return deferred.promise;
    };

    controller.populateGrid();
    $rootScope.$apply();

    controller.gridOptions.data.should.equal(expectedData);
  });
});
