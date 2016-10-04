'use strict';

var confirmations = require('./confirmations.module');

require('./confirmation.controller');
require('./confirmation-service.factory');

module.exports = confirmations;
