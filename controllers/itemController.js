var Item = require("../models/Item");
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

//usa mongoquerystring para passar querys pelos parametros do URL
controller.query = function(req, res){
    if(!req.params) res.send({});
    var qs = new MongoQs({
        custom: {
            
        }
    }
    )
    Item.find(qs.parse, function(err, items){
        
    });
};



controller.bid = function(req, res){
    Item.findById(req.body.item._id, (err, item) =>{
        if(err) res.send(err);
        if(!item.isActive) res.send(404);
        if(item.)
    })
}


