'use strict';

var confirmations = require('./confirmations.module');
var confirmationTemplate = require('./confirmation.html');

function confirmationService($uibModal) {
  function show(popupText) {
    var modalInstance = $uibModal.open({
      template: confirmationTemplate,
      controllerAs: 'modalVm',
      size: 'md',
      controller: 'ConfirmationController',
      resolve: {
        popupText: function getPopupText() { return popupText; }
      }
    });
    return modalInstance.result;
  }

  return {
    show: show
  };
}

confirmationService.$inject = [
  '$uibModal'
];

confirmations
  .factory('confirmationService', confirmationService);
