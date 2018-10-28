/**
 * PassportJS authentication middleware
 * COMMON MIDDLEWARE
 * This is required to passport work properly.
 * http://passportjs.org/docs
 *
 * No sessions according to REST constraints described at http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm .
 * RESTFull API must be stateless.
 */

var passport = require('passport');

module.exports = function (app) {
    'use strict';

    app.use(passport.initialize()); //initialize passport module
};
