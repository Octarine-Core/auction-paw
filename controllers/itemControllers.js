var Item = require("../models/Item");
var Bid = require('../models/Bid');
var MongoQs = require("mongo-querystring");
var controller = {};

controller.allItems = function(req, res){
    Item.find({}, (err, items)=>{
        if(err) res.send(err);
        res.send(items);
    });
};
controller.myItems = function(req, res){
    if(!req.user)res.send("Not logged in");
    Item.find({owner: req.user._id}, function(err, items){
        if(err) res.send(err);
        res.send(items);
    });
};

controller.byID = function(req,res,next){
    Item.findById(req.params.id, (err, item)=>{
        if(err) res.send(err);
        res.send(item);
    })
}

//usa mongoquerystring para passar querys pelos parametros do URL
controller.query = function(req, res){
    if(!req.query) res.send({});
    var qs = new MongoQs();
    Item.find(qs.parse(req.params), function(err, items){
        if(err)res.send(err);
        res.send(items);
    });
};

//faz um lance
controller.bid = function(req, res){
    var bidID;
    Bid.create({
        bidder: req.user._id,
        value: req.body.value
    }, function(err, bid){
        bidID=bid._id
    });

    Item.findById(req.body.item._id, (err, item) =>{
        if(err) res.send(err);
        if(!item.isActive) res.send(404);
        Item.update(item, {$push: {bids: bidID}});
    });
};

module.exports = controller;
