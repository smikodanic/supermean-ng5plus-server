/**
 * Methods common for all models.
 */
module.exports = function (modelCommon) {
    'use strict';

    //add new doc
    var add = function (doc) {
        return modelCommon.createAsync(doc);
    };

    //save() method or Bluebird's saveAsync()
    var save = function (docObj) {
        var doc = new modelCommon(docObj);
        return doc.saveAsync();
    };


    //count and list docs for 'moQuery'
    var list = function (moQuery, limit, skip, sort) {
        return modelCommon
            .countAsync(moQuery)
            .then(function (resultsNum) {
                return modelCommon
                    .find(moQuery)
                    .limit(limit)
                    .skip(skip)
                    .sort(sort)
                    .execAsync()
                    .then(function (resultsArr) {
                        var results = {
                            success: true,
                            count: resultsNum,
                            data: resultsArr
                        };
                        return results;
                    });
            });
    };


    //delete one doc
    var deleteOne = function (moQuery) {
        return modelCommon.findOneAndRemoveAsync(moQuery);
    };


    //get doc
    var getOne = function (moQuery, sort) {
        return modelCommon
            .findOne(moQuery)
            .sort(sort)
            .execAsync();
    };


    //update a doc
    var editOne = function (moQuery, docNew, updOpts) {
        return modelCommon.findOneAndUpdateAsync(moQuery, docNew, updOpts);
    };


    return {
        add: add,
        save: save,
        list: list,
        deleteOne: deleteOne,
        getOne: getOne,
        editOne: editOne
    };

};
