'use strict';

var dataAccess = require('./data-access.module');

require('./locations-data-service.factory');
require('./lookup-data-service.factory');
require('./vehicles-data-service.factory');

module.exports = dataAccess;
