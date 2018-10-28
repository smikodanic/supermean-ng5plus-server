/*
 * DEBUGGER
 * Show API input/output in console.
 * Works only in dev environment which can be activated with $export NODE_ENV=dev .
 */

const chalk = require('chalk');
var config = require('app/config');




/**
 * Show API input in console.
 * @return {Void}
 */
module.exports.in = function (req) {
    'use strict';
    if (config.env.name === 'development') { //will work only in development mode
        // debug(chalk.green(req.method + ' ' + req.url, 'params:', JSON.stringify(req.params), ' body:', JSON.stringify(req.body), ' query:', JSON.stringify(req.query), ' headers:', JSON.stringify(req.headers)));
        console.log(chalk.gray.bgYellow('IN ') + chalk.gray(req.method + ' ' + req.url, 'params:', JSON.stringify(req.params), ' body:', JSON.stringify(req.body), ' query:', JSON.stringify(req.query)));
    }
};


/**
 * Show API output in console.
 * @return {Void}
 */
module.exports.out = function (req, jdata) {
    'use strict';
    if (config.env.name === 'development') { //will work only in development mode
        console.log(chalk.gray.bgYellow('OUT ') + chalk.gray(req.method + ' ' + req.url, ' ', JSON.stringify(jdata)));
    }
};