/**
 * Mongoose middleware for mongoDB
 */

const mongoose = require('mongoose');
const chalk = require('chalk');
const util = require('util');

//options
var timeout = 30 * 1000; //30 seconds
var connOpts = {
    // useMongoClient: true, //deprecated in mongoose 5
    keepAlive: timeout,
    connectTimeoutMS: timeout,
    poolSize: 2
};


//events
var onEvent = function (conn, dbConfig) {
    'use strict';

    //events mongoose.connection or db
    conn.on('error', function (err) {
        console.error(chalk.red(dbConfig.uri, err, 'readyState:' + conn.readyState));
    });

    conn.on('connected', function () {
        console.info(chalk.blue(dbConfig.uri, '-connected'));
    });

    conn.on('open', function () {
        // console.info(chalk.blue(dbConfig.uri, '-connection open'));
    });

    conn.on('reconnected', function () {
        console.info(chalk.blue(dbConfig.uri, '-connection reconnected'));
    });

    conn.on('disconnected', function () {
        console.warn(chalk.blue(dbConfig.uri, '-connection disconnected'));
    });

    process.on('SIGINT', function () {
        mongoose.disconnect(function () {
            console.log(chalk.blue(dbConfig.uri, '-disconnected on app termination by SIGINT'));
            process.exit(0);
        });
    });
};


//make default connection when nodejs app is started (see: server/app/index.js)
module.exports.connectDefault = function (dbConfig) {
    'use strict';

    if (!dbConfig.enabled) return;

    //establish mongoose connection (use 'mongoose.connection')
    var db = mongoose.connect(dbConfig.uri, connOpts);
    // console.log(util.inspect(db));

    //show events
    onEvent(mongoose.connection, dbConfig);

};


//create connection on demand
module.exports.connect = function (dbConfig) {
    'use strict';

    //establish mongoose connection (use 'db')
    var db = mongoose.createConnection(dbConfig.uri, connOpts);
    // console.log(util.inspect(db));

    //show events
    onEvent(db);

    //close connection if db is not active
    if (!dbConfig.enabled) db.close();

    return db;
};


//default schema plugins
module.exports.pluginsDefault = function (schema, pluginOpts) {
    //mongoose.plugin(function (schema. pluginOpts) {
    //  schema.add({datum: Date});
    //});
};
