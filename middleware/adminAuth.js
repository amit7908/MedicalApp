const jwt = require("jsonwebtoken");
const config = require("../config/config")

exports.authAdiminJwt = (req,res,next)=>{
    if(req.cookies && req.cookies.adminToken){
        jwt.verify( req.cookies.adminToken, config.secrect_key,(err,data)=>{
            if(!err){
                req.admin= data;
                console.log("authadminjwt",req.admin);
                next();
            }else{
                console.log("authadminjwt",err);
                next()
            }
        })
    }else{
        console.log("admin cookie data not found");
        next();
    }
}