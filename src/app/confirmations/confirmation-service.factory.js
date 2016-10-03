'use strict';

var confirmations = require('./confirmations.module');

function confirmationService($uibModal) {
  function show(popupText) {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/confirmation.html',
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

confirmations.$inject = [
  '$uibModal'
];

confirmations
  .factory('confirmationService', confirmationService);
