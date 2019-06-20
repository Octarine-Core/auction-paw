const express = require('express');
const router  = express.Router();
const passport = require("passport");

/* POST login. */
function notLogged(req, res, next){
    if(!req.user)next();
    next(500);
}

var logged = function(req, res, next){
    if(req.isAuthenticated()){
      next();
    }
    else{
      next(createError(505));
    }
  };

router.post('/login', notLogged, passport.authenticate('local', {failureRedirect: "/login", successRedirect: "/me"}), 
        function(req, res){
    }
);

router.get("/logout", logged, function(req, res, next){
    req.logOut();
    res.redirect("/");
});


module.exports = router;