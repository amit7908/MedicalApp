
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const utils = require("../utils/utils");



const login = (req, res) => {
  res.render("./admin/login", {
    title: "login page",
  });
};

const adminLogin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((data) => {
      if (data && data.isAdmin) {
        const hashPassword = data.password;
        if (bcrypt.compareSync(req.body.password, hashPassword)) {
          const token = jwt.sign(
            {
              id: data._id,
              name: data.name,
            },
            config.secrect_key,
            { expiresIn: "30m" }
          );
          res.cookie("adminToken", token);

          res.cookie("email", req.body.email);
          res.cookie("password", req.body.password);

          console.log("login Successfully", data);
          res.redirect("/admin/dashboard");
        } else {
          console.log("incorrect password");
          res.redirect("/admin/");
        }
      } else {
        console.log(
          "Invalid email to access admin role"
        );
        res.redirect("/admin/");
      }
    })
    .catch((err) => {
      console.log("adminLogin", err);
    });
};
const admin_dashboard = (req, res) => {
  if (req.admin) {
    User.find()
      .then((admindetails) => {
        if (admindetails) {
          res.render("./admin/dashboard", {
            data: req.admin,
            detail: admindetails,
          });
        } else {
          console.log("no data found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const admin_logout = (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin/");
};

module.exports = {
  //register,
//registerAdmin,
  login,
  adminLogin,
  admin_dashboard,
  admin_logout,
};
