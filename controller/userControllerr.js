const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const utils = require("../utils/utils");
const tokenModel = require("../model/tokenModel");
const crypto = require("crypto");
const { log } = require("console");
const About = require("../model/aboutModel");
const { request } = require("http");
const camp = require("../model/CampgalleryModel")

const home = (req, res) => {
  const loginData = {};
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }

  res.render("./user/index",{
    title:"about page",
    data:User.find(),
    loginData:loginData
})
};
const about=async(req,res)=>{
  const loginData = {};
  const testimonidata = await About.find()
  const campdata = await camp.find()
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }
  res.render("./user/about",{
    title:"about page",
    data:User.find(),
    loginData:loginData,
    testimonidata:testimonidata,
    campdata:campdata
  })
  
};
const doctor = (req, res) => {
  const loginData = {};
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }
  res.render("./user/doctor", {
    title: "doctor page",
    data: User.find(),
    loginData:loginData
  })
}
const blog = (req, res) => {
  const loginData = {};
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }
  res.render('./user/blog', {
    title: "blog page",
    data: User.find(),
    loginData:loginData
  })
}

const blog_detail=(req, res)=>{
  const loginData = {};
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }
  res.render('./user/blog_detail', {
    title: "blog_detail page",
    data: User.find(),
    loginData:loginData
  })
}



const contact=(req, res)=>{
  const loginData = {};
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }
  res.render('./user/contact',{
    tittle:"contact page",
    data: User.find(),
    loginData:loginData
  })
}


const department = (req,res)=>{
  const loginData = {};
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }
              res.render("./user/department", {
                data: req.user,
                loginData:loginData
              });
            
};

const register = (req, res) => {
  const loginData = {};
  if(req.cookies.isLogedin){
    loginData.isLogedin = req.cookies.isLogedin || undefined;
  }
  res.render("./user/register", {
    data: User.find(),
    message2: req.flash("message2"),
    loginData:loginData
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
            if (req.body.rememberme) {
              res.cookie("email", req.body.email);
              res.cookie("password", req.body.password);
            }
            console.log("login successfull", data);
            res.redirect("/");
          } else {
            req.flash("message2", "Incorrect password");
            res.redirect("/login");
          }
        } else {
          req.flash("message2", "User not verified");
          res.redirect("/login");
        }
      } else {
        req.flash(
          "message2",
          "No user found please try with anothe email or register first"
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
  blog,
  doctor,
  blog_detail,
  contact,
  department,
  register,
  registerCreate,
  login,
  loginCreate,
  logout,
  confirmaton,
};
