const jwt =require("jsonwebtoken");
const config = require("../config/config")

exports.authUserJwt =(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        jwt.verify(req.cookies.userToken, config.secrect_key,(err,data)=>{
            if(!err){
                req.user = data;
                console.log("authuserjwt", req.user);
                next();
            }else{
                console.log("authUserJwt",err);
                next();
            }
        })
        // .then(data =>{
        //     req.user = data
        //     next()
        // })
        // .catch(err =>{
        //     console.log("error from jwt verify",err);
        //     next();
        // })
    }else{
        console.log("cookie data not found");
        next();
    }
}