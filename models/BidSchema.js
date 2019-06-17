var mongoose = require('mongoose');
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

module.exports = BidSchema;