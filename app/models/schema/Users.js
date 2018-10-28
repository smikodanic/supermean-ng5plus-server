const Schema = require('mongoose').Schema;
var vText = require('./_validators/validateText.js');
var vResource = require('./_validators/validateResource.js');

//options
var opts = require('./_options');
opts.collection = 'users';


//schema definition
var Sch = new Schema({

    first_name: {type: String, required: 'First name is required'},
    last_name: {type: String, required: 'Last name is required'},
    address: String,
    city: String,
    country: String,

    phone: String,
    email: {type: String, required: 'Email is required.', index: {name: 'email', unique: true}},
    website: String,

    misc: Schema.Types.Mixed,

    username: {type: String, required: 'Username is required', index: {name: 'username', unique: true}},
    password: {type: String, required: 'Password is required'},

    role: {type: String, enum: ['admin', 'customer'], default: 'customer'},
    is_active: {type: Boolean, default: true}

}, opts);


/* =-=-=-=-= MIDDLEWARES (pre & post hooks) =-=-=-=-= */
var pre_users = require('./_middlewares/pre_users');
var post_users = require('./_middlewares/post_users');
Sch.pre('save', pre_users.cryptPasswordApi_secret);
Sch.post('remove', post_users.afterUserDelete);


/* =-=-=-=-= VALIDATORS [activated on doc.save() or doc.validate()] =-=-=-=-= */
Sch.path('email').validate(vResource.emailCheck, 'Email is not valid.');
Sch.path('username').validate(vText.hasLengthBetween(5, 13), '{PATH} must contain from 5 to 13 characters.');
Sch.path('password').validate(vText.hasLengthBetween(5, 13), '{PATH} must contain from 5 to 13 characters.');



module.exports = Sch;