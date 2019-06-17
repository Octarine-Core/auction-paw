var mongoose = require("mongoose");
var moment = require('moment');

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
        bids: [{type: mongoose.Schema.Types.ObjectId, ref: "Bid"}],
        createdOn: {type:Date, required:true, default: Date.now},
        minimum: {type: mongoose.Schema.Types.Number},
        expires: {type:Date, default: moment + 50000, required: true},
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

ItemSchema.methods.deActivate = function(cb){
    //Desativa o Item mudando a data de expiracao para 'agora'
    return this.cancelled;
};

module.exports = mongoose.model("Item", ItemSchema);
