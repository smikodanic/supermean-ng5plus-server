//bluebird promisification
const BPromise = require('bluebird');
const mongoose = BPromise.promisifyAll(require('mongoose'));
mongoose.Promise = BPromise; //Prevent error: "mpromise (mongoose's default promise library) is deprecated"
const jsonpatch = require('fast-json-patch');
var authLib = require('../lib/authLib');

//define models
var usersModel = mongoose.model('usersMD', require('./schema/Users'));



/*** Common methods ***/
module.exports = require('./_commonMethods')(usersModel);



/*** Specific methods ***/

//register new user
module.exports.register = module.exports.add;


//check credentials username:password and login
module.exports.login = function (username, password) {
    'use strict';

    return usersModel
        .findOne({username: username})
        .then(function (userDoc) {
            var err;
            if (!userDoc) {
                err = new Error('Username does not exists.');
                err.level = 'info';
                throw err;
            }

            var passDecoded = authLib.base64ToStr(userDoc.password);
            if (passDecoded !== password) {
                err = new Error('Password is not correct.');
                err.level = 'info';
                throw err;
            } else {

                //can't login if user is not activated (approved)
                if (!userDoc.is_active) {
                    err = new Error('Your account is not active.');
                    err.level = 'info';
                    throw err;
                } else {
                    return userDoc;
                }

            }
        });
};


//patch (modify) 'password'
module.exports.patchPassword = function (username, pass_old, pass_new) {
    'use strict';

    return module.exports.login(username, pass_old) //first check if old password is correct
        .then(function (doc) {

            var patchArr = [{
                op: 'replace',
                path: '/password',
                value: pass_new
            }];


            //apply patch to doc object
            jsonpatch.applyPatch(doc, patchArr, true);
            var docNew = doc;

            //create new mongoose doc with assigned save() methods
            doc.set(docNew);

            return doc.saveAsync();
        });

};