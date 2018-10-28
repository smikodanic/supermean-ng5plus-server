/**
 * Middlewares
 */
var authLib = require('../../../lib/authLib');


/**
 * Crypt password and api_secret by Base64, reversible function.
 * this.password - password to be crypted and entered by user
 * this.api_secret - api_secret to be crypted and entered by user
 */
module.exports.cryptPasswordApi_secret = function (next) {
    'use strict';
    this.password = authLib.strToBase64(this.password);
    // this.password = authLib.encrypt(this.password);
    next();
};


/**
 * Disable updating of api_secret and api_key.
 * api_key and api_secret shouldn't be modified.
 */
module.exports.constApiCredentials = function (next) {
    'use strict';
    // console.log(this.isModified('api_key'));
    if (this.isModified('api_key') || this.isModified('api_secret')) {
        this.invalidate('api_key');
        this.invalidate('api_secret');
    }
    next();
};