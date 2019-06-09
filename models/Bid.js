var mongoose = require("mongoose");

var BidSchema = new mongoose.Schema(
    {
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: Date,
        value: mongoose.Schema.Types.Decimal128
    }
)