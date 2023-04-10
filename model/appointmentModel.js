const mongoose = require("mongoose");

const schema = mongoose.Schema;

const appointmentSchema = new schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
})

const appointmentModel = mongoose.model("Appointments",appointmentSchema);
module.exports = appointmentModel;