var User = require("../models/User");
var bcrypt = require("bcrypt");
var validator = require("email-validator");
var jwt = require('jsonwebtoken');
var secret = require('../config').jwtSecret;

var controller = {};

controller.register = function(req, res, next){
    //Create a User
    console.log(req.body.password);
    User.create(
        {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: false
    },
    (err, user) => {
        if(err) next(err);
        next();
    });
};

controller.nameFromId = function(req, res, next){
    User.findById(req.body.id, (err, user)=>{
        if(err) next(err);
        res.name = user.name;
    });
};


//generates an API token, saves it in the User 'token' field, and puts it in the body of the response
controller.generateApiToken = function(req, res, next){
    jwt.sign(req.user.id, secret, {expiresIn: req.body.expiresIn}, function(err, token){
        if(err){next(err)};
        res.body.token = token;
        User.update({_id: req.user.id}, {$push: {tokens: res.body.token}}, function(err, raw){
            if(err)next(err);
            next();
        });
    });
    
}

controller.query
module.exports = controller;