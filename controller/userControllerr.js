const User = require("../model/userModel");
const Doctor = require("../model/doctorModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const utils = require("../utils/utils");
const tokenModel = require("../model/tokenModel");
const crypto = require("crypto");
const { log } = require("console");
const About = require("../model/aboutModel");
const camp = require("../model/CampgalleryModel")



const home = async(req, res) => {
  const loginData = {};
  const doctorData = await Doctor.find().limit(3)
  const campdata = await camp.find();
  const testimonidata = await About.find();
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.email = req.cookies.email || undefined;
    loginData.name = req.cookies.name || undefined;
  }

  res.render("./user/index",{
    title:"about page",
    data:User.find(),
    loginData:loginData,
    doctorData:doctorData,
    campdata:campdata,
    testimonidata:testimonidata,
    message1: req.flash("message1"),
    message2: req.flash("message2"),
})
};

const about=async(req,res)=>{
  const loginData = {};
  const testimonidata = await About.find()
  const campdata = await camp.find()
  const docdata = await Doctor .aggregate(
    [{ $limit : 3}]
  )
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.email = req.cookies.email || undefined;
    loginData.name = req.cookies.name || undefined;
  }
  res.render("./user/about",{
    title:"about page",
    data:User.find(),
    loginData:loginData,
    testimonidata:testimonidata,
    campdata:campdata,
    docdata:docdata,
    message1: req.flash("message1"),
    message2: req.flash("message2"),
  })
  
};


const doctor = async (req, res) => {
  const loginData = {};
  const drData = await Doctor.find()
  if (req.cookies.isLogedin) {

    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;
  }
  res.render("./user/doctor", {
    title: "doctor page",
    data: User.find(),

    loginData: loginData,
    doctorData: drData,
  })
};





const contact = (req, res) => {
  const loginData = {};
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;
  }
  res.render('./user/contact', {
    tittle: "contact page",
    data: User.find(),
    loginData: loginData
  })
}



const dentistry = async(req, res) => {
  const loginData = {};
  const doctorData = await Doctor.aggregate([
    {
      $match:{
        department:"Dentist"
      }
    }
  ])
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;
  }
  res.render('./user/dentistry', {
    tittle: "dentistry page",
    data: User.find(),
    loginData: loginData,
    doctorData:doctorData
  })
}

const cardiology = async(req, res) => {
  const loginData = {};
  const doctorData = await Doctor.aggregate([
    {
      $match:{
        department:"Cardiologist"
      }
    },])
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;
  }
  res.render('./user/cardiology', {
    tittle: "cardiology page",
    data: User.find(),
    loginData: loginData,
    doctorData:doctorData
  })
}

const ent_specialist = async(req, res) => {
  const loginData = {};
  const doctorData = await Doctor.aggregate([
    {
      $match:{
        department:"ENT"
      }
    },])
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;
  }
  res.render('./user/ent', {
    tittle: "ent_specialist page",
    data: User.find(),
    loginData: loginData,
    doctorData:doctorData
  })
}

const orthopedic = async(req, res) => {
  const loginData = {};
  const doctorData = await Doctor.aggregate([
    {
      $match:{
        department:"Orthopedic"
      }
    },])
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;
  }
  res.render('./user/orthopedic', {
    tittle: "orthopedic page",
    data: User.find(),
    loginData: loginData,
    doctorData:doctorData,
  })
}

const neuro = async(req, res) => {
  const loginData = {};
  const doctorData = await Doctor.aggregate([
    {
      $match:{
        department:"Neurologist"
      }
    },])
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;
    

  }
  res.render('./user/neuroanatomy', {
    tittle: "neuroanatomy page",
    data: User.find(),
    loginData: loginData,
    doctorData:doctorData
  })
}

const medicine = async(req, res) => {
  const loginData = {};
  const doctorData = await Doctor.aggregate([
    {
      $match:{
        department:"Medicine"
      }
    },])
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;

  }
  res.render('./user/medicine', {
    tittle: "medicine page",
    data: User.find(),
    loginData: loginData,
    doctorData:doctorData
  })
}

const appointment = (req, res) => {
  const loginData = {};
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.email = req.cookies.email || undefined;
    loginData.name = req.cookies.name || undefined;

  }
  res.render('./user/appointment_form', {
    tittle: "appointment page",
    data: User.find(),
    loginData: loginData
  })
}



const department = async (req, res) => {
  const loginData = {};
  const department = req.params.category
  const doctordata = await Doctor.aggregate([
    {
      $match: {
        department: `${department}`
      }
    }
  ])
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;

  }
  res.render("./user/doc_department", {
    data: req.user,
    loginData: loginData,
    doctordata: doctordata
  });

};

const register = (req, res) => {
  const loginData = {};
  if (req.cookies.isLogedin) {
    loginData.isLogedin = req.cookies.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;

  }
  res.render("./user/register", {
    data: User.find(),
    message2: req.flash("message2"),
    loginData: loginData
  });
};

const registerCreate = (req, res) => {
  const { name, email, password } = req.body;
  const newPassword = utils.securePassword(password);
  const userModel = new User({
    name: name,
    email: email,
    password: newPassword,
  });
  userModel
    .save()
    .then((user) => {
      const token_model = new tokenModel({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      token_model
        .save()
        .then((token) => {
          const senderEmail = "amit7908272361@gmail.com";
          const password = "prtulsjptavlkcpc";
          var transporter = utils.transport(senderEmail, password);
          var mailoptions = {
            from: "no-reply@raju.com",
            to: user.email,
            subject: "Account Verification",
            text:
              "Hello " +
              req.body.name +
              ",\n\n" +
              "Please verify your account by clicking the link: \nhttp://" +
              req.headers.host +
              "/confirmation/" +
              user.email +
              "/" +
              token.token +
              "\n\nThank You!\n",
          };
          utils.mailSender(req, res, transporter, mailoptions);
        })
        .catch((err) => {
          console.log("error while creating token", err);
        });
    })
    .catch((err) => {
      req.flash("message2", "user registration failed");
      res.redirect("/register");
    });
};

const confirmaton = (req, res) => {
  tokenModel
    .findOne({ token: req.params.token })
    .then((token) => {
      if (!token) {
        console.log("verification link may be expired");
      } else {
        User.findOne({ _id: token._userId, email: req.params.email })
          .then((user) => {
            if (!user) {
              req.flash("message2", "User not found");
              res.redirect("/login");
            } else if (user.isVerified) {
              req.flash("message2", "user is already verified");
            } else {
              user.isVerified = true;
              user
                .save()
                .then((result) => {
                  req.flash("message1", "user verifed successFully");
                  res.redirect("/login");
                })
                .catch((err) => {
                  console.log("somthing went wrong", err);
                });
            }
          })
          .catch((err) => {
            console.log("error while finding user", err);
          });
      }
    })
    .catch((err) => {
      console.log("error while finding token", err);
    });
};

const login = (req, res) => {
  const loginData = {};
  if (req.cookie) {
    loginData.email = req.cookie.email || undefined;
    loginData.password = req.cookie.password || undefined;
    loginData.isLogedin = req.cookie.isLogedin || undefined;
    loginData.name = req.cookies.name || undefined;

  }

  res.render("./user/login", {
    message1: req.flash("message1"),
    message2: req.flash("message2"),
    loginData: loginData,
  });
};

const loginCreate = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        if(data.status){
          if (data.isVerified) {
            const hashPassword = data.password;
            if (bcrypt.compareSync(req.body.password, hashPassword)) {
              const token = jwt.sign(
                {
                  id: data._id,
                  name: data.name,
                },
                config.secrect_key,
                { expiresIn: "1d" }
              );
              res.cookie("userToken", token);
              res.cookie("isLogedin", "true")
              res.cookie("name",data.name)
              if (req.body.rememberme) {
                res.cookie("email", req.body.email);
                res.cookie("password", req.body.password);
              }
              console.log("login successfull", data);
              res.redirect("/");
            } else {
              req.flash("message2", "Incorrect email or password..!");
              res.redirect("/login");
            }
          } else {
            req.flash("message2", "User not verified");
            res.redirect("/login");
          }
        }else{
          req.flash("message2","Dear user you are blocked")
          res.redirect("/login")
        }
      } else {
        req.flash(
          "message2",
          "Incorrect email or password..!"
        );
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log("login create", err);
    });
};

// const dashboard = (req, res) => {
//   if (req.user) {
//     User.find()
//       .then((userDetails) => {
//         if (userDetails) {
//           res.render("dashboard", {
//             data: req.user,
//             details: userDetails,
//           });
//         } else {
//           console.log("No data found");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.clearCookie("isLogedin");
  res.redirect("/");
};






module.exports = {
  home,
  about,
  
  doctor,
  
  contact,
  department,
  dentistry,
  cardiology,
  ent_specialist,
  orthopedic,
  neuro,
  medicine,
  appointment,
  register,
  registerCreate,
  login,
  loginCreate,
  logout,
  confirmaton
};