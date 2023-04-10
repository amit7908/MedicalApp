const mongoose =require('mongoose')
const Contactschema = new mongoose.Schema({
    message:{
        type:String,
        required : true,
    },
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required : true,
    },
    
    subject:{
        type:String,
        required : true,
    }
    
},{
    timestamps:true
})
const ContactModel = new mongoose.model('Contact',Contactschema)
module.exports = ContactModel