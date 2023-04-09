
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const utils = require("../utils/utils");
const Campgallery = require("../model/CampgalleryModel");
const contact =require("../model/ContactModel")
const about =require("../model/aboutModel")

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
  deletecontact

};
