/**
 * /admin/...
 */


/**
 * POST /admin/test
 * Test admin endpoint.
 */
module.exports.index = function (req, res, next) {
    'use strict';

    res.json({
        success: true,
        message: 'Customer endpoint works!'
    });

};