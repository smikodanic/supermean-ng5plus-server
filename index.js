/**
 * Main server file
 */

var config = require('./app/config');
var app = require('./app/_app.js');
var port = config.env.server.port;


//create HTTP server
var server = require('http').createServer(app);
server.listen(port);


//server events
server.on('error', require('./events').onError(port));
server.on('listening', require('./events').onListening(server));
