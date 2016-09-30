'use strict';

var fleet = require('./fleet.module');

function FleetLocationDetailsController($state, locationsDataService) {
  var self = this;

  self.location;

  function initialize() {
    var locationId = $state.params['id']; // eslint-disable-line dot-notation
    locationsDataService.getLocation(locationId)
      .then(function populate(response) {
        self.location = response.data;
      });
  }

  initialize();
}

FleetLocationDetailsController.$inject = [
  '$state',
  'locationsDataService'
];

fleet.controller('FleetLocationDetailsController', FleetLocationDetailsController);
