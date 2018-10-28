/**
 * Delete databases, collections and endpoints after user is deleted.
 */
module.exports.afterUserDelete = function () {
    'use strict';
    var queryObj = {user_id: this._id};
    this.model('dbmoDatabasesMD').remove(queryObj)
        .then(function (result) {
            // console.log('dbmoDatabasesMD', JSON.stringify(result, null, 2));
            return result;
        });

    this.model('dbmoCollectionsMD').remove(queryObj)
        .then(function (result) {
            // console.log('dbmoCollectionsMD', JSON.stringify(result, null, 2));
            return result;
        });

    this.model('dbmoEndpointsMD').remove(queryObj)
        .then(function (result) {
            // console.log('dbmoCollectionsMD', JSON.stringify(result, null, 2));
            return result;
        });
};
