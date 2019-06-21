var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require('./config').jwtSecret;
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'auction-paw.net';
var User = require('./models/User')

module.exports = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.sub, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});
