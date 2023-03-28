const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required : true,
    },
    
    isAdmin:{
        type:Boolean,
        default: false
    },
    type:{
        type:Number,
        default:0,
    },
    isVerified:{
        type:Boolean,
        defaut:false,
    }
})

const userModel = new mongoose.model("Users",userSchema);

module.exports = userModel;