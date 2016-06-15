 var mongoose = require("mongoose");
//Schema

var campSchema = new mongoose.Schema({
    name: String,
    img: String,
    txt: String,
    comments: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"}
        ],
    op: {
        id: {type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
        username: String
    }  
});

var Camp = mongoose.model("Camp", campSchema);

module.exports=Camp