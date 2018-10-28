var timeLib = require('app/lib/timeLib.js');
var config = require('app/config');


module.exports = function (req, res) {
    'use strict';

    //get uptime
    var uptime = process.uptime();
    var uptime_human = timeLib.secondsToString(uptime);

    var jdata = {
        api: {
            name: config.api_name,
            version: 'v1',
            url: config.env.url,
            environment: config.env.name,
            server: config.env.server
        },
        nodejs: {
            version: process.version,
            platform: process.platform,
            uptime: uptime,
            uptime_human: uptime_human
        },
        mongoose: {
            version: require('mongoose').version
        },
        socket_io: {
            version: require('socket.io/package').version
        },
        client: {
            ip: req.client.ip,
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query
        }
    };
    res.json(jdata);
};