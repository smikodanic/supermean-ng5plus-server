const express = require('express');
const router = express.Router();
const passport = require('passport');


/* Passport auth middleware (users - admin, operator, cashier) */
var authCheckUsers = passport.authenticate('jwt-users', {
    successRedirect: '',
    // failureRedirect: '/examples/auth/passport/badauth',
    failureRedirect: '',
    failWithError: true, //send error as JSON instead of 'unauthorized' string
    failureFlash: false,
    session: false //this must be false
});


/**
 * Middleware which allow access for only specific user's role (admin or operator or cashier)
 * @param  {String} userRole - admin | operator | cashier
 * @return {Function}         - middleware function
 */
var mustHaveRole = function (userRole) {
    'use strict';
    return function (req, res, next) {
        if (req.user.role === userRole) {
            next();
        } else {
            next(new Error('Role ' + req.user.role + ' doesn\'t have permission for this endpoint.'));
        }
    };
};

// API routes
router.get('/', require('./root.js'));

// users
router.post('/users/register', require('./users.js').register);
router.post('/users/login', require('./users.js').login);
router.get('/users/loggedinfo', authCheckUsers, require('./users.js').loggedinfo);

// admin
router.get('/admin/test', authCheckUsers, mustHaveRole('admin'), require('./admin/test.js').index);

// customer
router.get('/customer/test', authCheckUsers, mustHaveRole('customer'), require('./customer/test.js').index);




module.exports = router;