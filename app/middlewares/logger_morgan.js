/**
 * Morgan HTTP request logger
 * https://github.com/expressjs/morgan
 */

var morgan = require('morgan');

module.exports = function (app, config) {
    'use strict';

    // log every request to the console (works only when NODE_ENV=development or NODE_ENV=)
    if (config.env.name === 'development') {
        app.use(morgan('dev'));
        // app.use(morgan('short'));
        // app.use(morgan('combined'));
    }

};
