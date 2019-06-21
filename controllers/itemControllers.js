var Item = require("../models/Item");
var MongoQs = require("mongo-querystring");
var controller = {};
var createError = require('http-errors');
var moment = require('moment');
const uuidv4 = require('uuid/v4');
const path = require('path');
const multer = require('multer');
var mongoose = require('mongoose');
var Bid = require('../models/Bid');

//Todos os documentos na colecao items(incluindo expirados, cancelados)
controller.allItems = function (req, res, next) {
    Item.find({}, (err, items) => {
        if (err) next(err);
        res.items = items;
        next();
    });
};

//Envia os items cujo owner e' o user a fazer o pedido
controller.myItems = function (req, res, next) {
    Item.find({ owner: req.user._id }, function (err, items) {
        if (err) next(err)
        res.items = items;
        next();
    });
};

//Devolve os items cujo user passado pelo body ganhou
controller.userWonAuctions = function(req, res, next){
    Item.find({}, function (err, items) {
        var wonItems = [];
        items.forEach(item => {
            if(item.winningBid){
                if(item.winningBid.bidder === req.body.id){
                    wonItems.push(item);
                };
            };
        });
        req.items = wonItems;
    });
};

//Envia ID, recebe Item com esse id
controller.byID = function (req, res, next) {
    Item.findById(req.params.id, (err, item) => {
        if (err) next(err);
        res.item = item;
        next();
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
                res.item = item;
                next();
        });
        });    
    });
};

//desativa a possibilidade de fazer lances num item (ninguem ganha :c ))
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

//Cria um item
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

controller.viewItem = function (req, res, next) {
    Item.findById(req.params.id, (err, item) => {
        if (err) res.send(err);
        else{
            res.render('../views/viewItem', {item: item});
        }
    })
};

module.exports = controller;
