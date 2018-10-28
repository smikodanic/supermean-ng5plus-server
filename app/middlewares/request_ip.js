/**
 * Get client IP address.
 */
var requestIp = require('request-ip');

module.exports = function (req, res, next) {
    'use strict';
    req.client.ip = requestIp.getClientIp(req);
    next();
};