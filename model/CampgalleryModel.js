const mongoose =require('mongoose')
const Campgalleryschema = new mongoose.Schema({
   
    image:[{
        type:String,
        require:true,
    }]
},{
    timestamps:true
})
const CampgalleryModel = new mongoose.model('Campgallery',Campgalleryschema)
module.exports = CampgalleryModel