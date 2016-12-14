require('./fleet-locations.controller');
var fleetLocationsIdColumnTemplate = require('./fleet-locations-id-column.html');
var fleetLocationsActionsColumnTemplate = require('./fleet-locations-actions-column.html');

describe('fa.fleet.FleetLocationsController > ', function describeImpl() {
  var $q;
  var $rootScope;
  var locationsDataService;
  var confirmationService;
  var controller;

  var location = {
    id: '12345CH',
    siteId: 'ind'
  };

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_, _$rootScope_, _locationsDataService_, _confirmationService_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    locationsDataService = _locationsDataService_;
    confirmationService = _confirmationService_;
    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('FleetLocationsController', {
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
    locationsDataService.deleteLocation = function deleteLocation() {
      return $q.when();
    };
  }));

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
  });

  describe('delete', function deleteTest() {
    beforeEach(function beforeEachImpl() {
      controller.populateGrid = function populateGrid() {
      };
    });

    it('asks user to confirm the action', function testImpl() {
      var showSpy = sinon.spy(confirmationService, 'show');

      controller.deleteLocation(location);
      $rootScope.$apply();

      var expectedMessage = "Delete location 'ind'?"; // eslint-disable-line quotes
      showSpy.getCall(0).args[0].should.equal(expectedMessage);
    });

    it('should delete an existing record if user confirms', function testImpl() {
      var deleteLocationSpy = sinon.spy(locationsDataService, 'deleteLocation');
      controller.deleteLocation(location);
      $rootScope.$apply();

      deleteLocationSpy.calledWith(location.id).should.be.true;
    });

    it('should repopulate the grid if user confirms', function testImpl() {
      var populateGridSpy = sinon.spy(controller, 'populateGrid');
      controller.deleteLocation(location);
      $rootScope.$apply();

      populateGridSpy.called.should.be.true;
    });

    it('should not delete an existing record if user cancels', function testImpl() {
      confirmationService.show = function show() {
        var deferred = $q.defer();
        deferred.reject();
        return deferred.promise;
      };

      var deleteLocationSpy = sinon.spy(locationsDataService, 'deleteLocation');
      controller.deleteLocation(location);
      $rootScope.$apply();

      deleteLocationSpy.called.should.be.false;
    });
  });

  it('getColumnDefs should return expected data', function testImpl() {
    var expectedColumnDefs = [
      {
        displayName: 'Site ID',
        field: 'siteId',
        type: 'string',
        enableSorting: true,
        suppressRemoveSort: true,
        sort: {
          priority: 0,
          direction: 'asc'
        },
        cellTemplate: fleetLocationsIdColumnTemplate
      },
      {
        displayName: 'Name',
        field: 'name',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Vehicles',
        field: 'vehicleCount',
        type: 'number',
        enableSorting: false
      },
      {
        displayName: 'City',
        field: 'city',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'State',
        field: 'stateCode',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Actions',
        width: 200,
        field: 'id',
        enableSorting: false,
        cellTemplate: fleetLocationsActionsColumnTemplate
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
    var expectedData = [location];
    locationsDataService.getLocations = function getLocations() {
      var deferred = $q.defer();
      deferred.resolve({data: expectedData});
      return deferred.promise;
    };

    controller.populateGrid();
    $rootScope.$apply();

    controller.gridOptions.data.should.equal(expectedData);
  });
});
