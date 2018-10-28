/**
 * Library for authentication
 */
const crypto = require('crypto');
const moment = require('moment');
const BPromise = require('bluebird');


/**
 * Crypt string by synchronous Password-Based Key Derivation Function 2 (PBKDF2).
 * @param  {[type]} str - input string to be crypted
 * @return {[type]}     - encrypted string: "66ca2509023527f51651d20c898e2201e801ad0817"
 *
 * Possible alghoritms: sha1, sha256, sha512, md5
 * PBKDF2 is a one-way hashing algorithm. It's not possible to decrypt the generated hash.
 */
module.exports.strToSha256 = function (str, salt, length) {
    'use strict';
    if (str) {
        return crypto.pbkdf2Sync(str, salt, 1000, length, 'sha256').toString('hex');
    } else {
        return '';
    }
};




/**
 * Base64 encoder. Base64 is reversible function, so string can be reverted back (decoded).
 * @param  {[type]} str - input string to be crypted "test"
 * @return {[type]}     - encoded string: "dGVzdA=="
 */
module.exports.strToBase64 = function (str) {
    'use strict';
    var buff = new Buffer(str);
    var b64 = buff.toString('base64');
    return b64;
};

/**
 * Base64 decoder.
 * @param  {[type]} b64 - input string to be decoded: dGVzdA==
 * @return {[type]}     - decoded string: "test"
 */
module.exports.base64ToStr = function (b64) {
    'use strict';
    var buff = new Buffer(b64, 'base64');
    var str = buff.toString();
    return str;
};


/**
 * Crypt and decrypt password
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
var algorithm = 'des-ede3-cbc';
var encryption_key = 'xcEWyDogt23wers';
var algo = 'base64'; //can be 'hex'
module.exports.encrypt = function (text) {
    'use strict';
    var cipher = crypto.createCipher(algorithm, encryption_key);
    var crypted = cipher.update(text, 'utf8', algo);
    crypted += cipher.final(algo);
    return crypted;
};
module.exports.decrypt = function (text) {
    'use strict';
    var decipher = crypto.createDecipher(algorithm, encryption_key);
    var dec = decipher.update(text, algo, 'utf8');
    dec += decipher.final('utf8');
    return dec;
};



/**
 * Create moment hash.
 */
module.exports.momentEncode = function () {
    'use strict';
    var now = moment().toString(); //"2017-01-06T09:10:19.542"
    var momentHash = module.exports.strToBase64Strong(now); //=cXQU10dzNkVORWRJBTUq9UMFp2T1EERJNTRE1UeBlmT3FUaihGcFlEcK5mU

    return momentHash;
};

/**
 * Decode moment hash and return Date.
 * @param {String} b64 - encoded moment value : =cXQU10dzNkVORWRJBTUq9UMFp2T1EERJNTRE1UeBlmT3FUaihGcFlEcK5mU
 */
module.exports.momentDecode = function (b64) {
    'use strict';
    var momentStr = module.exports.base64ToStrStrong(b64);
    var momentDate = new Date(momentStr);
    var mom = moment(momentDate);

    return mom;
};

