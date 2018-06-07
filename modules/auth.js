'use strict';

const passport = require('passport');
const passportJWT = require('passport-jwt');

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: passportJWT.ExtractJwt.fromHeader("authorization")
};

app.get(`${config.apiVersion}/loginFailure`, function(req, res, next) {
    let ret = retcode.getFailedAuthenticate();
    res.json(ret);
});

module.exports = function () {

    let strategy = new passportJWT.Strategy(params, function (payload, done) {

        let ret = retcode.getSuccess();
        ret['data'] = {
            id: payload.id,
            email: payload.email
        };

        return done(null, ret);


    /*
        let user = users.find(function (u) {
            return u.id === payload.id;
        });

        if (user) {

            return done(null, {
                id: user.id,
                email: user.email
            });

        } else {

            return done(new Error('User not found'), null);

        }
    */

    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', {  
                session: false,
                failureRedirect: `${config.apiVersion}/loginFailure`
            });
        }
    };
};