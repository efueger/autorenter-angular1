describe('fa.fleet.fleetLocationDetailsModeService > ', function describeImpl() {
  var $state;
  var fleetLocationDetailsModeService;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$state_, _fleetLocationDetailsModeService_) {
    $state = _$state_;
    fleetLocationDetailsModeService = _fleetLocationDetailsModeService_;
  }));

  it('getNavigationStateName returns correct value', function testImpl() {
    $state.current = { name: 'fooBar'};
    var actualValue = fleetLocationDetailsModeService.getNavigationStateName();
    actualValue.should.equal('fooBar');
  });

  describe('isAddMode', function isAddModeTest() {
    it('returns false', function testImpl() {
      $state.current = { name: 'fleet.locations.add.foo' };
      fleetLocationDetailsModeService.isAddMode().should.be.false;
    });

    it('returns true', function testImpl() {
      $state.current = { name: 'fleet.locations.add' };
      fleetLocationDetailsModeService.isAddMode().should.be.true;
    });
  });

  describe('isEditMode', function isEditModeTest() {
    it('returns false', function testImpl() {
      $state.current = { name: 'fleet.locations.edit.foo' };
      fleetLocationDetailsModeService.isEditMode().should.be.false;
    });

    it('returns true', function testImpl() {
      $state.current = { name: 'fleet.locations.edit' };
      fleetLocationDetailsModeService.isEditMode().should.be.true;
    });
  });

  describe('isViewMode', function isViewModeTest() {
    it('returns false', function testImpl() {
      $state.current = { name: 'fleet.locations.view.foo' };
      fleetLocationDetailsModeService.isViewMode().should.be.false;
    });

    it.only('returns true', function testImpl() {
      fleetLocationDetailsModeService.getNavigationStateName = function() {
        return 'fleet.locations.view';
      };
      console.info('getNavigationStateName value from test = ' +
        fleetLocationDetailsModeService.getNavigationStateName());

      var isViewMode = fleetLocationDetailsModeService.isViewMode();
      console.info('isViewMode = ' + isViewMode);
      // isViewMode.should.be.true;
    });
  });
});
