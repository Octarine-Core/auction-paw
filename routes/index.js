var express = require('express');
const userController = require("../controllers/userControllers");
const item = require("../controllers/itemControllers");
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
})

router.post("/register", userController.register);

router.post("/save", function(req, res){
  item.save(req, res);
});

router.get("/me", function(req, res, next){
  console.log("user" + req.user);
  if(req.isAuthenticated()){
    res.render("index",{title: req.user.name});
  }
  else{
    res.redirect("/login");
  };
});


module.exports = router;
