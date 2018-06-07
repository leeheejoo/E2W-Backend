const passport = require('passport');
const passportJWT = require('passport-jwt');
const users = require('../db/users');
const cfg = require('../configs/jwt');

const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: passportJWT.ExtractJwt.fromHeader("authorization")
};

app.get('/api/v1/loginFailure', function(req, res, next) {
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
                failureRedirect: '/api/v1/loginFailure'
            });
        }
    };
};