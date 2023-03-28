const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const authUser = (req, res, next) => {
  if (req.user) {
    console.log("authUser", req.user);
    next();
  } else {
    req.flash("message2", "cannot access the page login first");
    res.redirect("/login");
  }
};

const authAdmin = (req, res, next) => {
  if (req.admin) {
    console.log("authadmin", req.admin);
    next();
  } else {
    res.redirect("/admin/");
  }
};

const securePassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const transport = (senderEmail, password) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user:senderEmail,
        pass:password,
    }
  });
  return transporter
};

const mailSender =(req,res,trans,mailoptions)=>{
    trans.sendMail(mailoptions,(err)=>{
        if(err){
            console.log("Technical Issue",err);
        }else{
            req.flash("message1","A Verfication Email Sent To Your Mail ID.... Please Verify By Click The Link.... It Will Expire By 24 Hrs...")
            res.redirect("/login")
        }
    })
}
module.exports = {
  authUser,
  authAdmin,
  securePassword,
  transport,
  mailSender
};
