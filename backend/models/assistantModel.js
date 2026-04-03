const mongoose = require("mongoose");

const assistantSchema = new mongoose.Schema({

    question:{
        type:String,
        required:true
    },

    answer:{
        type:String
    },

    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Assistant", assistantSchema);