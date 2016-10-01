'use strict';

var fleet = require('./fleet.module');

function FleetLocationDetailsController($q, $state, locationsDataService, statesDataService) {
  var self = this;

  self.location;

  self.states;

  self.selectedState;

  self.initialize =  function initialize() {
    var statesPromise = statesDataService.getStates()
      .then(function populate(response) {
        self.states = response.data;
      });

    if (self.isAddMode()) {
      self.location = {};
    } else {
      var locationPromise = locationsDataService.getLocation($state.params.id)
        .then(function populate(response) {
          self.location = response.data;
        });

      if (!self.isEditable()) {
        $q.all([locationPromise, statesPromise])
          .then(function setSelectedState() {
            self.states.forEach(function setState(stateElement) {
              if (stateElement.stateCode === self.location.state) {
                self.selectedState = stateElement;
              }
            });
          });
      }
    }
  };

  self.isAddMode = function isAddMode() {
    return $state.current.name === 'fleet.locations.add';
  };

  self.isEditMode = function isEditMode() {
    return $state.current.name === 'fleet.locations.edit';
  };

  self.isEditable = function isEditable() {
    return self.isAddMode() || self.isEditMode();
  };

  self.save = function save() {
    var savePromise;
    if (self.isAddMode()) {
      savePromise =  locationsDataService.addLocation(self.location);
    } else {
      savePromise = locationsDataService.updateLocation(self.location);
    }

    savePromise
      .then(function notify() {
        $state.go('fleet.locations.list');
      });
  };

  self.initialize();
}

FleetLocationDetailsController.$inject = [
  '$q',
  '$state',
  'locationsDataService',
  'statesDataService'
];

fleet.controller('FleetLocationDetailsController', FleetLocationDetailsController);
