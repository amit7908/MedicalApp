
const User = require("../model/userModel");
const Doctor = require("../model/doctorModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const utils = require("../utils/utils");
const notifier = require("node-notifier");
const { response } = require("express");



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

 const doctor = (req,res) =>{
  if(req.admin){
    Doctor.find()
    .then((doctorDetails)=>{
      if(doctorDetails){
        res.render('./admin/doctors',{
          data:req.admin,
          doctor_Data:doctorDetails
        })
      }else{
        console.log("No data found in doctors");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
}
const addDoctor = (req,res)=>{
 console.log(req.body);
  const{docName,email,contactNumber,age,qualiFication,department,experience} = req.body;
  Doctor.findOne({docName: docName , email : email})
  .then((dup_data)=>{
    if (dup_data) {
      notifier.notify({
        title:"Warning",
        message: "Doctor already exists",
        sound:true,
        wait:false
      })
      res.redirect('/admin/doctor')
    } else {
      const doctorModel = new Doctor({
        docName: docName,
        email: email,
        contactNumber: contactNumber,
        age: age,
        qualiFication: qualiFication,
        department: department,
        experience:experience,
        image: req.file.filename
      }) 
      doctorModel.save()
      .then((data)=>{
        // alert("Doctor added successfully")
        notifier.notify({
          title:"Doctor added",
          message: "Doctor added successfully",
          sound:true,
          wait:false
        })
        console.log("doctor added successfully");
        res.redirect("/admin/doctors")
      }).catch((err)=>{
        console.log("Doctor data not saved",err);
      })
    }
  })
 
}
const editDoctor =(req,res)=>{
  if(req.admin){
    Doctor.findById({_id:req.params.id},req.body,{new :true})
    .then((doctorDetails)=>{
      if(doctorDetails){
        res.render('./admin/editDoctor',{
          data:req.admin,
          doctor_Data:doctorDetails
        })
      }else{
        console.log("No data found in doctors");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
}
const updateDoctor =(req,res)=>{
  const { docName, email, contactNumber, age, qualiFication, department,experience, image } = req.body;
    const id = req.params.id
    Doctor.findById(id).then((result) => {
      if (!result) {
        return res.status(404).send("Doctor not found");
        console.log("Doctor not found");
        
      }
      result.docName = docName;
      result.email = email;
      result.contactNumber = contactNumber;
      result.age = age;
      result.qualiFication = qualiFication;
      result.department = department;
      result.experience = experience;
      result.image = image;
  
      return result.save().then((updatedResult) => {
        res.redirect('/admin/doctors');
        console.log(updatedResult, "updated successfully");
      }).catch((err) => {
        console.log(err, "error while saving doc_data");
      });
    }).catch((err) => {
      console.log(err, "update doctor failed");
    })
}

const deleteDoctor = (req,res)=>{
  const id = req.params.id;
  Doctor.findByIdAndRemove(id)
  .then(result =>{
    res.redirect('/admin/doctors')
  }).catch(err =>{
    console.log(err);
  })
}


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
  doctor,
  addDoctor,
  editDoctor,
  updateDoctor,
  deleteDoctor,
  admin_logout,
};
