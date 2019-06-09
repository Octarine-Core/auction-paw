const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require("../models/User");

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {

        return UserModel.findOne({email, password})
           .then(user => {
               if (!user) {
                   return cb(403, false, {message: 'Incorrect email or password.'});
               }
               
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));
