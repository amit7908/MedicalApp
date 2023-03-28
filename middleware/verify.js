const User = require("../model/userModel");

exports.checkEmali = (req,res,next)=>{
    User.findOne({email:req.body.email})
    .then(data =>{
        if(data){
            req.flash("message2","email already exists")
            return res.redirect('/register')
        }
        const {name,email,password,cpassword}=req.body ;
        if(!(name && email && password && cpassword)){
            req.flash("message2","all inputs are required");
            return res.redirect('/register');
        }
        
        if(password !== cpassword){
            req.flash("message2","Incorrect password");
            return res.redirect('/register');
        }

        next()
    })
    .catch(err =>{
        console.log(err);
        next();
    })
}