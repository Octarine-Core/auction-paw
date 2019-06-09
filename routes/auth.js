const express = require('express');
const router  = express.Router();
const passport = require("passport");

/* POST login. */
router.post('/login', passport.authenticate('local', {failureRedirect: "/login", successRedirect: "/me"}), 
        function(req, res){
    }
);

router.get("/logout", function(req, res, next){
    req.logOut();
    res.redirect("/");
});


module.exports = router;