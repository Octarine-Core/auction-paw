var mongoose = require("mongoose");
var moment = require('moment');

var BidSchema = new mongoose.Schema(
    {
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {type: Date, required: true, default: moment},
        value: {type: mongoose.Schema.Types.Decimal128, required: true, min: 100}
    }
);

var ItemSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        images: [String],
        category: String,
        bids: [BidSchema],
        createdOn: {type:Date, required:true, default: Date.now},
        minimum: {type: mongoose.Schema.Types.Number, min: 100, required:true, default: 100},
        expires: {type:Date, default: moment, required: true},
        cancelled: {type: Boolean, default: false, required: true}
        //falta meter o valor inicial de licitaçao
        //aqui podiamos meter uma variavel para guardar as coordenadas do utilizador para mais tarde pegar nelas e fazer um mapa com os leiloes 
    }   
);

ItemSchema.virtual("isActive").get(function(){
    //Verifica se esta ativo verificando se ainda esta dentro do prazo de expiracao

    if(moment(this.expires).isBefore(moment()) || this.cancelled){
        return false;
    }
    return true;
});

module.exports = mongoose.model("Item", ItemSchema);
