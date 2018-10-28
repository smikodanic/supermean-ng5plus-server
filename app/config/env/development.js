//$export NODE_RIND=true  (will rebuild all mongoose indexes)
var node_rind = false;
if (process.env.NODE_RIND) {
    node_rind = JSON.parse(process.env.NODE_RIND);
}

var config = {
    name: 'development',
    server: {
        virtualHost: false,
        domain: 'dev.supermean.org',
        port: process.env.PORT || 4444
    },
    mongodb: {
        enabled: true,
        uri: process.env.MONGODB_URI || 'mongodb://5.189.161.70:27017/ng5plus-server',
        driver: 'mongoose',
        rebuildIndexes: node_rind
    },
    auth: {
        enabled: true,
        local: {
            username: 'someuser',
            password: 'somepass'
        },
        facebook: {
            appID: '',
            appSecret: '',
            callbackURL: ''
        },
        twitter: {
            apiKey: '',
            apiSecret: '',
            callbackURL: ''
        },
        google: {
            clientID: '',
            clientSecret: '',
            callbackURL: ''
        }
    }

};

module.exports = config;
