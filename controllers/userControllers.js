var User = require("../models/User");
var bcrypt = require("bcrypt");
var validator = require("email-validator");

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

controller.generateApiToken = function(req, res){
    
}

controller.query
module.exports = controller;