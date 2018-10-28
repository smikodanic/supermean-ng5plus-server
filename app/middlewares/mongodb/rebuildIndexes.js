const chalk = require('chalk');

/**
 * Rebuild indexes for one model (collection)
 * @param  {Object} modelName - for example: usersModel
 */
module.exports.oneModel = function (modelName) {
    'use strict';
    modelName.collection.dropIndexesAsync()
        .then(function () {
            return modelName.ensureIndexesAsync()
                .catch(function (err) {
                    throw err;
                });
        })
        .catch(function (err) {
            throw err;
        });
};



/**
 * Rebuild indexes for all models (collections)
 */
module.exports.allModels = function () {
    'use strict';
    var mongoose = require('mongoose');

    console.log(chalk.blue('NODE_RIND=true - Mongo indexes rebuild for: ', mongoose.modelNames()));

    var modelsArr = mongoose.modelNames();
    /*
    [
        'usersMD',
        'settingsMD',
        'plansMD',
        'dbmoDatabasesMD',
        'dbmoCollectionsMD',
        'dbmoEndpointsMD',
        'dbmoEndpointsAvailableMD',
        'emailServersMD',
        'emailEndpointsAvailableMD',
        'emailEndpointsMD',
        'authGroupsMD',
        'authUsersMD',
        'authEndpointsAvailableMD',
        'authEndpointsMD'
    ]
     */

    modelsArr.forEach(function (mdl) {

        mongoose.model(mdl).collection.dropIndexesAsync()
            .then(function () {
                return mongoose.model(mdl).ensureIndexesAsync();
            })
            .catch(function (err) {
                throw err;
            });

    });


};