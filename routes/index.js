var express = require('express');
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

router.get("/me", function(req, res, next){

  if(req.isAuthenticated()){
    res.render("index")
  }
  else{
    res.redirect("/login");
  }
}


module.exports = router;
