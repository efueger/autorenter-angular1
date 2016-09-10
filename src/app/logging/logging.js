'use strict';

var logging = require('./logging.module');

require('./logging.constants');
require('./log-api.provider');
require('./logging.config');
require('./logging.run');

module.exports = logging;
