'use strict';

var admin = require('./admin.module');

require('./admin.route.config');
require('./admin-users.controller');
require('./admin-branding.controller');

module.exports = admin;
