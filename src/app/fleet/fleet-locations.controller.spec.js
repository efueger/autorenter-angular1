describe('fa.fleet.FleetLocationsController > ', function describeImpl() {
  var controller;
  var deleteLocationSpy;

  beforeEach(angular.mock.module('fa.fleet'));
  beforeEach(inject(function injectImpl(_locationsDataService_, _strings_) {
    var locationsDataService = _locationsDataService_;
    var strings = _strings_;
    var fakeConfirmationService = {
      show: function show() { return this; },
      then: function then() { return (arguments[0] || function empty() {})(); },
      self: {
        populateGrid: function populateGrid() { return true; }
      }
    };
    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('FleetLocationsController', {
          'locationsDataService': locationsDataService,
          'confirmationService': fakeConfirmationService,
          'strings': strings
        });
        deleteLocationSpy = sinon.spy(locationsDataService, 'deleteLocation');
      }
    ]);
  }));
  beforeEach(function beforeEach() {

  });
  it('should have existing delete method', function test() {
    should.exist(controller.deleteLocation);
  });

  it('should delete an existing record', function testImpl() {
    var id = 'ind';
    controller.deleteLocation(id);
    deleteLocationSpy.called.should.be.true;
  });
});
