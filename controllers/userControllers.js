var User = require("../models/User");
var bcrypt = require("bcrypt");
var validator = require("email-validator");

var controller = {};

controller.register = (req, res) => {
    if(validator.validate(req.email)){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        }),
        function(err, user){
            if(err) res.send(err);

            res.status(200).send();
        }
    }
}