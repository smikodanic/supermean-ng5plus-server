/**
 * Middleware for error manipulation.
 */
const config = require('app/config');
const chalk = require('chalk');


/**
 * Convert error to JSON and send formatted error to client.
 * @param  {Error} err - non formatted error
 * @return {Object}     - JSON formatted error message
 */
var send2client = function (err, res) {
    'use strict';
    var status = err.status || 500;
    res.status(status);

    var jdata = {
        status: status,
        message: err.message,
        stack: err.stack
    };
    res.json(jdata);
};


/**
 * Insert error to 'log_errors' collection
 * @param  {Error}   errDoc - error document object
 * @param  {Function} next
 * @return null
 */
var send2mongo = function (err, req, next) {
    'use strict';

    //full url
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    var errDoc = {
        status: err.status || 500,
        level: err.level || 'error',
        category: err.category || 'general',
        message: err.message,
        stack: err.stack,
        verb: req.method,
        url: fullUrl,
        ip: req.client.ip,
        time: Date.now(),
        err_orig: err || {} //original error
    };


    // log_errors_model.insertLog(errDoc)
    //     .catch(function (err) {
    //         err.category = 'log_errors';
    //         next(err);
    //     });
};



module.exports.sender = function (err, req, res, next) {
    'use strict';

    /*** OUTPUT ***/
    send2client(err, res);
    // send2mongo(err, req, next);

    //output to console (only in development environment)
    if (config.env.name === 'development') {
        console.log(chalk.red(err.stack));
        console.log(chalk.magenta(JSON.stringify(err, null, 4)));
    }
};


/* report error 404 on bad /api/... URLs*/
module.exports.badAPIurl = function (req, res, next) {
    'use strict';

    if (req.url.indexOf('/api') !== -1) {
        var jdata = {
            status: 404,
            message: 'Error 404: Url ' + req.url + ' not found'
        };
        res.status(404).json(jdata);
    } else {
        next();
    }
};


//catch all uncaught exceptions
module.exports.uncaught = function () {
    'use strict';
    process.on('uncaughtException', function (err) {
        console.error(chalk.red(err)); //output to console
    });
};