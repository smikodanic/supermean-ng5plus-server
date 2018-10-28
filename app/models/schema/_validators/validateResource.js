/**
 * Validate web or dns resources.
 *
 * ****** Caution: Returned value must be Boolean !
 */
const dns = require('dns');



/**
 * Check if domain is valid and registered.
 * @param  {String} domain - domain name, for example 'supermean.org'
 *
 * @return {Boolean}    - returned value must be true or false
 */
module.exports.domainCheck = function (pathValue) {
    'use strict';

    dns.lookup(pathValue, function (err, addresses) {
        if (err) {
            return false; //domain doesnt exist
        }

        // console.log(JSON.stringify(addresses, null, 2));

        if (!addresses) {
            return false;
        } else {
            return true;
        }
    });
};


/**
 * Validate email.
 *
 * @return {Function}
 */
module.exports.emailCheck = function (pathValue) {
    'use strict';

    //spliting email
    var emlArr = pathValue.split('@');

    //check @ char
    if (pathValue.indexOf('@') === -1) {
        return false;
    }

    //check user
    if (!emlArr[0]) {
        return false;
    }

    //check special chars of user
    if (encodeURI(emlArr[0]) !== emlArr[0]) {
        return false;
    }

    //check domain
    dns.lookup(emlArr[1], function (err, addresses) {
        if (err) {
            return false; //domain doesnt exist
        }

        // console.log(JSON.stringify(addresses, null, 2));

        if (!addresses) {
            return false;
        } else {
            return true;
        }

    });

};

