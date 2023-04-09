const mongoose = require("mongoose")

const schema = mongoose.Schema ;

const aboutSchema = new schema({
    aboutmessage:{
        type:String,
        required:true
    },
    docname:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

const aboutModel = new mongoose.model("about",aboutSchema);

module.exports = aboutModel;