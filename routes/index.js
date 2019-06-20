
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
    next(createError(505));
  }
}

/* GET home page. */

router.get("/", function(req, res, next){
  var userId;
  if(req.isAuthenticated()){
    userId = req.user.id;
  }else{
    userId = "";
  }
  console.log(userId);
  res.render("loggedIndex", {userId: userId});
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

//Faz render dos leiloes que eu ganhei
router.get("/me/won", logged, function(req, res,next){
  req.body.id = req.user.id
  next();},
  itemController.userWonAuctions,
   function(req, res){ 
     res.render('me', {name: req.user.name, items: res.items})
    }
);

router.post("/disable/:id", logged, itemController.deActivate, function(req, res){
  res.redirect('/me');
});

router.get("/items", itemController.query, function(req, res){
  if(req.user)res.render('displayItems', {items: req.items, userId: req.user.id});
  res.render('displayItems', {items: res.items});
});

<<<<<<< HEAD
router.post("/viewItem/:id", function(req, res){
    itemController.viewItem(req, res);
=======
router.get("/viewItem/:id",itemController.byID, function(req, res){
  res.render('viewItem', {item: res.item});
>>>>>>> 17d86910212c60efbdff5012a59798a99139caeb
});

router.post("/bid/:id",logged, itemController.bid, function(req, res){
  res.redirect("/viewItem/" + res.item.id);
});


module.exports = router
