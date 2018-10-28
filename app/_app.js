/**
 * ************** /server/app/_app.js
 * Main application file
 * - middlewares: logger_morgan, debug, bodyParser, mongoose, static files, passportJS
 * - EJS view engine
 * - API routes
 * - error handlers: 404 bad API URL, error sender, uncaught errors
 * - single page app routes
 */

// ***access files from root, for example require('app/config')
require('rootpath')();

var config = require('./config');
var express = require('express');
var app = express();
var path = require('path');


/***** MIDDLEWARES *****/
require('./middlewares/logger_morgan.js')(app, config); //must be first to log each request (also static files)
require('./middlewares/debug.js')(app, config);
require('./middlewares/bodyParser.js')(app);

// ***mongoose
require('./middlewares/mongodb/mongooseDriver').connectDefault(config.env.mongodb);

// ***static file middlewares --- path.join() creates absolute path from root
var pjson = require('../../package.json');
app.use('/', express.static(path.join(__dirname, '../../dist/' + pjson.name)));

// ***auth middlewares
if (config.env.auth.enabled) {
    require('./middlewares/auth/passport.js')(app); //passport common middleware
    require('./middlewares/auth/passportstrategy_jwt.js').defineStrategy4users();
}

//=-=-= get client ip (req.client.ip)
app.use(require('./middlewares/request_ip.js'));



/***** EJS VIEW ENGINE  *****/
var viewPath1 = path.join(__dirname, 'views');
var viewPath2 = path.join(__dirname, '../../dist');
app.set('views', [viewPath1, viewPath2]);
// app.set('view engine', 'ejs');
app.set('view engine', 'html'); // ejs view engine with .html file extension
app.engine('html', require('ejs').renderFile);



/***** CORS PROBLEM & OTHER API RESPONSE HEADERS  ****/
app.use(require('./middlewares/cors.js'));



/****** API ROUTES *****************************/
app.use('/api', require('./routes/api/_api.js'));



/******************** ERROR HANDLERS *******************/
app.use(require('./middlewares/error.js').badAPIurl); //404 not found middleware. detect only /api/... bad URLs
app.use(require('./middlewares/error.js').sender); //send error to client, sentry and mongo
require('./middlewares/error.js').uncaught(); //uncaught exceptions



/****** CLIENT SIDE ROUTES ******************************************************
 (when browser is reloaded and is not / or /api. For example: /something/in/spa )
 ********************************************************************************/
app.use(function (req, res, next) {
    'use strict';
    res.render('index', {frontvar: config.frontvar});
});


/***** REBUILD MONGOOSE INDEXES *****/
if (config.env.mongodb.rebuildIndexes) { //rebuild indexes for all models (collections) on each NodeJS restart
    require('./middlewares/mongodb/rebuildIndexes').allModels();
}


module.exports = app;
