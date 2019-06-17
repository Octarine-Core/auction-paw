var express = require("express");
var router = express.Router();
const itemController = require("../controllers/itemControllers");

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { next(); }
    res.redirect('/error')
  };

function send(req, res){res.send()};

router.get("/items/mine", ensureAuthenticated, itemController.myItems, send);
router.get('/items/:id', itemController.byID, send);
router.get('/items', itemController.query, send);

//router.post('/items/:id/', ensureAuthenticated, );

module.exports = router;