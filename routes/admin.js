var express = require('express');
const userController = require("../controllers/userControllers");
const itemController = require("../controllers/itemControllers");
const createError = require('http-errors');

var router = express.Router();

var logged = function(req, res, next){
    if(req.isAuthenticated()){
      next();
    }
    else{
      next(createError(403));
    }
  }
  
var checkAdmin = function(req, res, next){
    if(req.user.isAdmin){
        next();
    }
    else{
        next(createError(403));
    }
}

router.get("/",  logged, checkAdmin, userController.allUsers, itemController.allItems,
function(req,res){
    res.render('backOffice', {users: res.users, items: res.items})}
);

router.post('/')
module.exports = router;