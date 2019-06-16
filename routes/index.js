
var express = require('express');
const userController = require("../controllers/userControllers");
const itemController = require("../controllers/itemControllers");

var router = express.Router();

var logged = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect("/error.html");
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});

router.get("/login", function(req, res, next){
  res.redirect("/login.html");
});

router.get("/register", function(req, res, next){
  res.redirect("/register.html");
});

router.get("/adicionarItem", logged, function(req, res, next){
  res.redirect("/adicionarItem.html");
});

router.post("/register", userController.register);

router.post("/save", itemController.create)

router.get("/mine", logged, itemController.myItems, function(req, res){res.send()});


//Faz render dos meus items
router.get("/me", logged, itemController.myItems, function(req, res){(res.render('me', {name: req.user.name, items: res.items}))});



module.exports = router
