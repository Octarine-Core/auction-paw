var mongoose = require("mongoose");

var BidSchema = new mongoose.Schema(
    {
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {type: Date, required: true},
        value: {type: mongoose.Schema.Types.Decimal128, required: true, min: 1}
    }
)
module.exports = mongoose.model("Bid", UserSchema);
