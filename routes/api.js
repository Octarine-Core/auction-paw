var express = require("express");
var router = express.Router();
var passport = require('passport');
const itemController = require("../controllers/itemControllers");

function sendJson(data){return function(req, res){
  res.json(data);
}};

router.get("/items/mine", passport.authenticate('jwt', {session:false}) , itemController.myItems,
function(req, res, next){

}, send);

router.get('/items/:id', itemController.byID, send);
router.get('/items', itemController.query,function(req,res,next){
  res.json(res.items);
});

router.post('/items/:id/', passport.authenticate('jwt', {session:false}), itemController.bid, sendJson(res.item));

module.exports = router;