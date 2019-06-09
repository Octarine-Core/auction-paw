var express = require('express');
const userController = require("../controllers/userControllers");
var router = express.Router();

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

router.post("/register", userController.register);


router.get("/me", function(req, res, next){
  console.log("user" + req.user);
  if(req.isAuthenticated()){
    res.render("index");
  }
  else{
    res.redirect("/login");
  };
});


module.exports = router;
