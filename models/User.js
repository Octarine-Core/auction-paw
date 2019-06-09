var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {type:String, unique:true},
        password: String,
        isAdmin: Boolean,
        isActive: Boolean
    }
);

module.exports = mongoose.model("User", UserSchema);
