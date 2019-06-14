var Item = require("../models/Item");
var MongoQs = require("mongo-querystring");
var controller = {};

//Todos os documentos na colecao items(incluindo expirados, cancelados)
controller.allItems = function(req, res){
    Item.find({}, (err, items)=>{
        if(err) res.send(err);
        res.send(items);
    });
};

//Envia os items cujo owner e' o user a fazer o pedido
controller.myItems = function(req, res){
    if(!req.user)res.send("Not logged in");
    Item.find({owner: req.user._id}, function(err, items){
        if(err) res.send(err);
        res.send(items);
    });
};

//Envia ID, recebe Item com esse id
controller.byID = function(req,res,next){
    Item.findById(req.params.id, (err, item)=>{
        if(err) res.send(err);
        res.send(item);
    })
};

//usa mongoquerystring para passar querys pelos parametros do URL
controller.query = function (req, res) {
    if (!req.query) res.send({});
    var qs = new MongoQs();
    Item.find(qs.parse(req.params), function (err, items) {
        if (err) res.send(err);
        res.send(items);
    });
};

//faz um lance, recebe o item updatado como resposta
controller.bid = function(req, res){
    Item.findById(req.body.item._id, (err, item) =>{
        if(err) res.send(err);
        if(!item.isActive) res.send(404);
        if(item.bids[item.bids.length - 1] > req.body.bid ){res.send(500)};
        item.bids.push(req.body.bid);
        item.save(function(err){
            if(!err){
                res.send(item);
            };
            res.send(err);
        });
    });
};

//desativa a possibilidade de fazer lances num item
controller.deActivate = function(req, res){
    Item.findById(req.body.item._id, (err, item) =>{
        if(item.isActive){
            item.cancelled = true;
            item.save((err, doc) => {
                if(!err) res.send(doc);
            });
        }
    })
}
    

controller.save = function (req, res) {
    var item = new Item(req.body);
    console.log(req.body);
    console.log(req.user._id);
    item.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            console.log("Item criado com sucesso");
            res.redirect("../");
        }
    });
};

module.exports = controller;
