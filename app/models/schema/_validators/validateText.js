/**
 * Validate text input
 *
 * ****** Caution: Returned value must be Boolean !
 */


/**
 * String must have from min to max characters.
 * @param  {String} pathValue - path value of doc to be inserted
 * @param  {Number} minLength - min allowed length
 * @param  {Number} maxLength - max allowed length
 *
 * @return {Boolean}    - returned value must be true or false
 */
module.exports.hasLengthBetween = function (minLength, maxLength) {
    'use strict';
    return function (pathValue) {
        return (pathValue.length >= minLength && pathValue.length <= maxLength);
    };
};
