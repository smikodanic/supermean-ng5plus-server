/**
 * Dump 'req' object into browser window
 * https://www.npmjs.com/package/nodedump
 */

var nodedump = require('nodedump').dump;


module.exports = function (req, res, next) {
    'use strict';

    if (req) {
        res.write(nodedump(req.cookies)).end();
        // res.write(nodedump(req.body)).end();
        // res.write(nodedump(req)).end();
    }

    next();
};