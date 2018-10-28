/**
 * Server events
 */

var chalk = require('chalk');



/**
 * Event listener for HTTP server "error" event.
 */
module.exports.onError = function (port) {
    'use strict';

    //onError callback function for server.on('error', onError);
    var onError = function (error) {

        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = (typeof port === 'string')
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            console.error(error);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(chalk.red(bind + ' is already in use'));
            process.exit(1);
            break;
        default:
            throw error;
        }
    };

    return onError;
};



/**
 * Event listener for HTTP server "listening" event.
 */
module.exports.onListening = function (server) {
    'use strict';

    //onError callback function for server.on('listening', onListening);
    var onListening = function () {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;

        console.log('Listening on ' + bind);
    };

    return onListening;
};
