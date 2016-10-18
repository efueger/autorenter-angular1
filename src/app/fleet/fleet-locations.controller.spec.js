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

  describe('delete', function deleteImpl() {
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

  // locationsDataService.getLocations = function() {
  //   $q.when({data: []});
  // };
});
