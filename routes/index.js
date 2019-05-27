var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});
router.get("/login", function(req, res){
  res.redirect("/login.html");
});

router.get("/register", function(req, res){
  res.redirect("/register.html");
});

module.exports = router;
