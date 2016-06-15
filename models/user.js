var mongoose=require("mongoose"),
locomongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

userSchema.plugin(locomongoose)

module.exports = mongoose.model("User", userSchema)