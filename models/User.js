var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {type:String, unique:true},
        password: {type:String, unique:true},
        isAdmin: {type:Boolean, required: true, default: false},
        isActive: {type:Boolean, required: true, default: true},
        token: String
    }
);

module.exports = mongoose.model("User", UserSchema);
