'use strict';

var confirmations = require('./confirmations.module');

function ConfirmationController($uibModalInstance, popupText) {
  var vm = this;

  vm.popupText = popupText;

  vm.confirm = function confirm() {
    $uibModalInstance.close();
  };

  vm.cancel = function cancel() {
    $uibModalInstance.dismiss('cancel');
  };
}

ConfirmationController.$inject = [
  '$uibModalInstance',
  'popupText'
];

confirmations.controller('ConfirmationController', ConfirmationController);
