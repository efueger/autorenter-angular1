'use strict';

var errorHandling = require('./error-handling.module');

require('./exception-handler.factory');
require('./http-error-handler.factory');
require('./error-handling.config');

module.exports = errorHandling;
