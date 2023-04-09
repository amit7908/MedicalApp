
const User = require("../model/userModel");
const Doctor = require("../model/doctorModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const utils = require("../utils/utils");

const Campgallery = require("../model/CampgalleryModel");
const contact =require("../model/ContactModel")
const about =require("../model/aboutModel")
const notifier = require("node-notifier");

const campgallery =(req,res)=>{
  if(req.admin){
  Campgallery.find()
      .then((galdata) =>{
      if(galdata){
          res.render('./admin/Campgallery',{
              data:req.admin,
              Campdata:galdata
            })
            console.log(galdata)
          }else{
            console.log("No data found of campgallery");
          }
     }) 
     .catch((err)=>{
        console.log(err);
      })
      }
    }

  

const addCampgallery =(req,res)=>{
  if(req.admin){
  res.render('./admin/addCampgallery',{
      data:req.admin
  })
} else{
  console.log("No data found");
}
}


const create=(req,res)=>{
  const Image=req.file;
  const Campdata = new Campgallery ({
      
      image: Image.path,
    
  })
  Campdata.save()
    .then(data =>{
          console.log(`data added successfully`);
          res.redirect('/admin/campgallery')
      }).catch(err=>{
          console.log(err);
      })
  }

const deleteCampgallery =(req,res)=>{
const id = req.params.id
Campgallery.findByIdAndRemove(id)
    .then(doc =>{
        console.log('delete successfully');
        req.flash('message','delete Product Successfully')
        res.redirect('/admin/campgallery')
    }).catch(err =>{
        console.log('error');
    })
}

//campgallery end

// contact start
const Contact =(req,res)=>{
  if(req.admin){
    contact.find()
      .then((contactdata) =>{
      if(contactdata){
          res.render('./admin/Contact',{
              data:req.admin,
              Condata:contactdata
            })
            console.log(contactdata)
          }else{
            console.log("No data found of campgallery");
          }
     }) 
     .catch((err)=>{
        console.log(err);
      })
      }
    }

    const addContact =async(req,res)=>{
try{
  const contactdata = new contact({
    message:req.body.message,
    name:req.body.name,
    email:req.body.email,
    subject:req.body.subject,

})
contactdata.save()
    .then(data =>{
        console.log(`data added successfully`);
        req.flash('message','Added Product Successfully')
        res.redirect('/admin/Contact')
    }).catch(err =>{
        console.log(err);
    })
}catch(err){
  console.log(err,"error from addcontact");
}
  }

  const deletecontact =(req,res)=>{
const id = req.params.id
contact.findByIdAndRemove(id)
    .then(doc=>{
        console.log('delete succeddfully')
        res.redirect('/admin/Contact')
    }).catch(err =>{
        console.log('error');
    })
}

// contact end


// about start
const About =(req,res)=>{
  if(req.admin){
    about.find()
      .then((Aboutdata) =>{
      if(Aboutdata){
          res.render('./admin/about',{
              data:req.admin,
              aboutdata:Aboutdata
            })
            console.log(Aboutdata)
          }else{
            console.log("No data found of about");
          }
     }) 
     .catch((err)=>{
        console.log(err);
      })
      }
    }

  

const addabout =(req,res)=>{
  if(req.admin){
  res.render('./admin/addabout',{
      data:req.admin
  })
} else{
  console.log("No data found");
}
}


const createabout=(req,res)=>{
  const Image=req.file;
  const aboutdata = new about ({
    aboutmessage:req.body.aboutmessage,
    docname:req.body.docname,
    department:req.body.department,
      image: Image.path,
    
  })
  aboutdata.save()
    .then(data =>{
          console.log(`data added successfully`);
          res.redirect('/admin/about')
      }).catch(err=>{
          console.log(err);
      })
  }

  const deleteabout =(req,res)=>{
    const id = req.params.id
    about.findByIdAndRemove(id)
        .then(doc=>{
            console.log('delete succeddfully')
            res.redirect('/admin/about')
        }).catch(err =>{
            console.log('error');
        })
    }
    

// about end


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


//appointment section
const appointment = require("../model/appointmentModel")

const addAppointment = (req,res)=>{
  const{name,phone,department,email,message} = req.body;
  const appointmentModel = new appointment({
    name: name,
    phone: phone,
    department: department,
    email:email,
    message:message
  })
  appointmentModel.save()
  .then(data =>{
    const senderEmail = "amit7908272361@gmail.com";
          const password = "prtulsjptavlkcpc";
          var transporter = utils.transport(senderEmail, password);
          var mailoptions = {
            from: "no-reply@raju.com",
            to: data.email,
            subject: "Verification for Appointment",
            text:
              "Hello " +
              req.body.name +
              ",\n\n" +
              "We got your request for appointment. \n Our agents will contact you sortly " +"\n\n"
              +"Thank you......"
          };
          utils.mailSender(req, res, transporter, mailoptions);
    console.log("appointment data",data);
    req.flash("message1","Application submited");
    notifier.notify({
      title:"Application Submitted",
      message: "Doctor added successfully",
      sound:true,
      wait:false
    })
    res.redirect("/")
  }).catch(err =>{
    console.log("appointment data not saved",err);
    req.flash("message2","Something went wrong ");
    res.redirect("/")
  })
}

const getAppointment = (req,res) =>{
  if(req.admin){
    appointment.find()
    .then((appointmentDetails)=>{
      if(appointmentDetails){
        res.render('./admin/appointment',{
          data:req.admin,
          appointment_Data:appointmentDetails
        })
      }else{
        console.log("No data found in doctors");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
}

const deleteAppointment = (req,res)=>{
  const id = req.params.id;
  appointment.findByIdAndRemove(id)
  .then(result =>{
    res.redirect('/admin/getAppointments')

  })
  .catch(err =>{
    console.log(err);
    res.redirect('/admin/getAppointments')
  })
}



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

  // campgallery
  campgallery,
  addCampgallery,
  create,
  deleteCampgallery ,
  Contact,
  addContact,
  About,
  addabout,
  deleteabout,
  createabout,
  deletecontact,
  addAppointment,
  getAppointment,
  deleteAppointment,
};
