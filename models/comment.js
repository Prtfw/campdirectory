var mongoose = require("mongoose"),

    commentSchema = mongoose.Schema({
        txt: String,
        said: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
        }
    })
    
    var Comment = mongoose.model("Comment", commentSchema)




module.exports = Comment