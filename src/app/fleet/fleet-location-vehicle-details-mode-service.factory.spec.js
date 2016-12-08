describe('fa.fleet.fleetLocationVehicleDetailsModeService > ', function describeImpl() {
  var $state;
  var fleetLocationVehicleDetailsModeService;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$state_, _fleetLocationVehicleDetailsModeService_) {
    $state = _$state_;
    fleetLocationVehicleDetailsModeService = _fleetLocationVehicleDetailsModeService_;
  }));

  it('getNavigationStateName returns correct value', function testImpl() {
    $state.current = { name: 'fooBar'};
    var actualValue = fleetLocationVehicleDetailsModeService.getNavigationStateName();
    actualValue.should.equal('fooBar');
  });

  describe('isViewMode', function isViewModeTest() {
    it('returns false', function testImpl() {
      fleetLocationVehicleDetailsModeService.getNavigationStateName = function getNavigationStateName() {
        return 'fleet.locations.vehicles.view.foo';
      };
      fleetLocationVehicleDetailsModeService.isViewMode().should.be.false;
    });

    it('returns true', function testImpl() {
      fleetLocationVehicleDetailsModeService.getNavigationStateName = function getNavigationStateName() {
        return 'fleet.locations.vehicles.view';
      };
      fleetLocationVehicleDetailsModeService.isViewMode().should.be.true;
    });
  });

  describe('isAddMode', function isAddModeTest() {
    it('returns false', function testImpl() {
      fleetLocationVehicleDetailsModeService.getNavigationStateName = function getNavigationStateName() {
        return 'fleet.locations.vehicles.add.foo';
      };
      fleetLocationVehicleDetailsModeService.isAddMode().should.be.false;
    });

    it('returns true', function testImpl() {
      fleetLocationVehicleDetailsModeService.getNavigationStateName = function getNavigationStateName() {
        return 'fleet.locations.vehicles.add';
      };
      fleetLocationVehicleDetailsModeService.isAddMode().should.be.true;
    });
  });

  describe('isEditMode', function isEditModeTest() {
    it('returns false', function testImpl() {
      fleetLocationVehicleDetailsModeService.getNavigationStateName = function getNavigationStateName() {
        return 'fleet.locations.vehicles.edit.foo';
      };
      fleetLocationVehicleDetailsModeService.isAddMode().should.be.false;
    });

    it('returns true', function testImpl() {
      fleetLocationVehicleDetailsModeService.getNavigationStateName = function getNavigationStateName() {
        return 'fleet.locations.vehicles.edit';
      };
      fleetLocationVehicleDetailsModeService.isEditMode().should.be.true;
    });
  });
});
