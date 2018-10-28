/**
 * Library for time manipulation
 */


/**
 * Convert seconds to more human readable string
 * @param  {[type]} seconds [description]
 * @return {[type]}         [description]
 */
module.exports.secondsToString = function (seconds) {
    'use strict';
    var numdays = Math.floor(seconds / 86400);
    var numhours = Math.floor((seconds % 86400) / 3600);
    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var numseconds = ((seconds % 86400) % 3600) % 60;
    return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
};
