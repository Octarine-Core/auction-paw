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
        bids: [{type: mongoose.Schema.Types.ObjectId}]
    }
)