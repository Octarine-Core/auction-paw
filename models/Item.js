var mongoose = require("mongoose");
var moment = require('moment');

var ItemSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        images: [String],
        category: String,
        bids: [{type: mongoose.Schema.Types.ObjectId, ref: "Bid"}],
        createdOn: {type:Date, required:true, default: Date.now},
        expires: {type:Date, default: Date.now},
        
    }
    
);

ItemSchema.virtual("isActive").get(function(){
    //Verifica se esta ativo verificando se ainda esta dentro do prazo de expiracao
    if(moment(this.expires).isBefore(moment())){
        return false;
    }
    return true;
});

ItemSchema.methods.deActivate = function(cb){
    //Desativa o Item mudando a data de expiracao para 'agora'
    if(this.isActive) this.constructor.update({_id: this._id}, {$set: {expires: moment()}}, cb);
};

module.exports = mongoose.model("Item", ItemSchema);
