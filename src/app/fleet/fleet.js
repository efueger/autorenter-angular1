'use strict';

var fleet = require('./fleet.module');

require('./fleet.config');
require('./fleet-locations.controller');
require('./fleet-reports.controller');

module.exports = fleet;
