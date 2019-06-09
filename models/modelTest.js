var Item = require("./Item");
var User = require("./User");
var mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/auction-paw', {useNewUrlParser: true});

Item.findOne({}, function(err, item){
    console.log(item.isActive);
});

