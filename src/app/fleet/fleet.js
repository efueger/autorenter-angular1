'use strict';

require('angular-ui-grid');

var fleet = require('./fleet.module');

require('./fleet.route.config');
require('./fleet-locations.controller');
require('./fleet-location-vehicles.controller');
require('./fleet-location-details.controller');
require('./fleet-reports.controller');
require('./fleet-location-add-strategy.factory');
require('./fleet-location-edit-strategy.factory');
require('./fleet-location-view-strategy.factory');
require('./fleet-location-strategy-factory.factory');
require('./fleet-location-details-mode-service.factory');

module.exports = fleet;
