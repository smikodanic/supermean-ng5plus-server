/*
 * environment dependant configuration:
 * $ export NODE_ENV=development
 * $ export NODE_ENV=production
 */

var config_env = require('./env/' + (process.env.NODE_ENV || 'development'));
var frontvar = require('./frontvar.js');

var config = {
    api_name: 'Ng5Plus-server API',
    api_key: 'soldawu',
    api_secret: 'agfčšaiggw2asj&hskžkl98g6$',
    env: config_env,
    frontvar: frontvar
};

module.exports = config;
