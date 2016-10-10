describe('fa.confirmations.FleetLocationsController > ', function describeImpl() {
  var controller;
  var locationsDataService;
  var confirmationService;
  var siteIdString = 'abc';

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(function beforeEach() {
    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('FleetLocationsController', {
          'locationsDataService': locationsDataService,
          'confirmationService': confirmationService,
          'strings': siteIdString
        });
      }
    ]);

    it('hello world', function testImpl() {
      controller.confirm();
    });
  });
});
