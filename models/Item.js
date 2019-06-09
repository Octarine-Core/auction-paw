var mongoose = require("mongoose");

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
    console.log(this.expires.toDateString());
    console.log(Date(Date.now()).toString());
    if((this.expires < Date.now)){
        return false;
    };
    return true;
});

module.exports = mongoose.model("Item", ItemSchema);
