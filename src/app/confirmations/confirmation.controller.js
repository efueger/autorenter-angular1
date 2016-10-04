'use strict';

var confirmations = require('./confirmations.module');

function ConfirmationController($uibModalInstance, popupText) {
  var self = this;

  self.popupText = popupText;

  self.confirm = function confirm() {
    $uibModalInstance.close();
  };

  self.cancel = function cancel() {
    $uibModalInstance.dismiss('cancel');
  };
}

ConfirmationController.$inject = [
  '$uibModalInstance',
  'popupText'
];

confirmations.controller('ConfirmationController', ConfirmationController);
