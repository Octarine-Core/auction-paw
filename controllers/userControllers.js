var User = require("../models/User");
var bcrypt = require("bcrypt");
var validator = require("email-validator");

var controller = {};

controller.register = function(req, res){
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
        if(err) res.send(err);
        res.status(200).send();
    });
};

controller.nameFromId = function(req, res){
    User.findById(req.body.id, (err, user)=>{
        if(err) res.send(err);
        res.send(user.name);
    });
};

controller.query
module.exports = controller;