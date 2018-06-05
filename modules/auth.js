const passport = require('passport');
const passportJWT = require('passport-jwt');
const users = require('../db/users');
const cfg = require('../configs/jwt');

const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: passportJWT.ExtractJwt.fromHeader("authorization")
};

app.get('/loginFailure', function(req, res, next) {
    res.json({message:'Failed to authenticate'});
});

app.get('/loginSuccess', function(req, res, next) {
    res.json({message:'Success to authenticate'});
});

module.exports = function () {

    let strategy = new passportJWT.Strategy(params, function (payload, done) {

        let user = users.find(function (u) {
            return u.id === payload.id;
        });

        if (user) {

            return done(null, {
                id: user.id,
                name: user.name
            });

        } else {

        return done(new Error('User not found'), null);

        }

    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', {  
                session: false,
                //successRedirect: '/loginSuccess',
                failureRedirect: '/loginFailure'
            });
        }
    };
};