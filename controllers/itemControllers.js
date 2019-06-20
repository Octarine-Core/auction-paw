var Item = require("../models/Item");
var MongoQs = require("mongo-querystring");
var controller = {};
var createError = require('http-errors');
var moment = require('moment');
const uuidv4 = require('uuid/v4');
const path = require('path');
const multer = require('multer');
var mongoose = require('mongoose');
var Bid = require('../models/BidSchema');

//Todos os documentos na colecao items(incluindo expirados, cancelados)
controller.allItems = function (req, res, next) {
    Item.find({}, (err, items) => {
        if (err) next(err);
        res.items = items;
    });
};

//Envia os items cujo owner e' o user a fazer o pedido
controller.myItems = function (req, res, next) {
    if (!req.user) res.send("Not logged in");
    Item.find({ owner: req.user._id }, function (err, items) {
        if (err) next(err)
        res.items = items;
        next()
    });
};

//Envia ID, recebe Item com esse id
controller.byID = function (req, res, next) {
    Item.findById(req.params.id, (err, item) => {
        if (err) next(err);
        res.item = item;
        next()
    });
};

//usa mongoquerystring para passar querys pelos parametros do URL
controller.query = function (req, res, next) {
    if (!req.query) res.send({});
    var qs = new MongoQs();
    console.log(qs.parse(req.query));
    Item.find(qs.parse(req.query), function (err, items) {
        if (err) next(err);
        res.items = items;
        next();
    });
};

//faz um lance, recebe o item updatado como resposta
controller.bid = function (req, res, next) {
    Item.findById(req.params.id, (err, item) => {
        console.log(req.body);
        if (err) res.send(err);
        if (!item.isActive) res.send(404);
        Bid.find(
            {
                '_id':{
                    $in: item.bids
                }
            },function(err, bids){
                if(bids.length !== 0){
                    if((req.body.bid < Math.max(bids) || req.body.bid < item.minimum))next(createError(500));
                }
                else{
                    if(req.body.bid < item.minimum) next(createError(500));
                }
            }
        );
        var newBid = new Bid({
            bidder: req.user._id,
            value: req.body.bid
        });
        newBid.save(function(err, bid){
            if(err)next(err);
            item.bids.push(newBid._id);
            item.save(function (err, item) {
                if (err) {
                    next(err)
                };
                res.item = item.populate('bids');
                next();
        });
        });    
    });
};

//desativa a possibilidade de fazer lances num item
controller.deActivate = function (req, res, next) {
    Item.findById({ _id: req.params.id }, (err, item) => {
        console.log(req.params.id);
        if (item.isActive) {
            Item.findByIdAndUpdate(req.params.id, { $set: { cancelled: true } },
                { new: true }, function (req, respond) {
                    if (err) console.log(err);
                    else{
                        res.redirect('back');
                    }
                });
        };
    });
};

controller.create = function (req, res, next) {
    var item = new Item(req.body);
    console.log(req.body);
    item.expires = moment().add(req.body.time, "weeks");
    item.owner = req.user._id;
    for (let i = 0; i < req.files.length; i++) {
        item.images[i] = req.files[i].filename;
    }
    item.minimum *= 100;
    item.save(function (err) {
        if (err) {
            console.log(err);
            next(err);
        };
        next();
    });
};

module.exports = controller;
