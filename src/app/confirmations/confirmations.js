'use strict';

var confirmations = require('./confirmations.module');

require('./confirmation.controller');
require('./confirmation-service.factory');
require('./routeChangeConfirmation.directive');

module.exports = confirmations;
