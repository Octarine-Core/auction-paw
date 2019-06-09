const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('local', {failureRedirect: "/login"}), 
        function(req, res){
            res.redirect("/");
    }
});

router.get("/logout", function(req, res, next){
    req.logOut();
    res.redirect("/");
});


module.exports = router;