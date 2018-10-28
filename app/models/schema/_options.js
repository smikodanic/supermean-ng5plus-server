/**
 * Common options for all schema types in this directory
 */

module.exports = {
    collection: '', //default collection
    _id: true, //disable _id
    id: false, //set virtual id property
    autoIndex: true, //auto-create indexes in mognodb collection on mongoose restart
    minimize: true, //remove empty objects
    safe: true, //pass errors to callback
    strict: true, //values not defined in schema will not be saved in db
    validateBeforeSave: true, //validate doc before saving. prevent saving false docs
    timestamps: { //create timestamps for each doc 'created_at' & 'updated_at'
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    // skipVersioning: { myProp: true }, //prevent changing version __v when 'myProp' is updated
    // versionKey: '_myV', //replace __v with _myV (not needed in most cases)
};
