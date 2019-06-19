
var express = require('express');
const userController = require("../controllers/userControllers");
const itemController = require("../controllers/itemControllers");
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path')
var storage = multer.diskStorage({
        destination: function(req, file, cb){
          cb(null, 'public/imagens/items');
        },
        filename: function (req, file, cb){
          cb(null, uuidv4() + path.extname(file.originalname))
        }
})
var upload = multer({
  storage: storage 
});

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

router.post("/save", upload.array('bla', 10), itemController.create, function(req, res){res.redirect('/me')});

//Faz render dos meus items
router.get("/me", logged, itemController.myItems, function(req, res){(res.render('me', {name: req.user.name, items: res.items}))});

//router.get('/items', itemController.query, res.rend('search',{items: res.items}));

router.post("/disable/:id",logged, function(req, res){
  
}, function(req, res){
  itemController.deActivate(req, res);
});

router.get("/items", itemController.query, function(req, res){
  if(req.user)res.render('displayItems', {items: res.items, userId: req.user.id});
  res.render('displayItems', {items: res.items});
});
 


module.exports = router
