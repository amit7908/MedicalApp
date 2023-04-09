const mongoose = require("mongoose")

const schema = mongoose.Schema ;

const doctorSchema = new schema({
    docName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    qualiFication:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

const doctorModel = new mongoose.model("Doctors",doctorSchema);

module.exports = doctorModel;