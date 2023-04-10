const express = require("express");
const bodyParser = require("body-parser")
const aController = require("../controller/adminController")
const utils =require("../utils/utils")
const multer = require("multer")
const path = require("path")


const router = express.Router();

router.use(bodyParser.urlencoded({ extended : true}));
router.use(bodyParser.json());

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/doctorPhotos/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-'+ Date.now() + "doctor"+ path.extname(file.originalname) )
    }
})

const maxsize = 5*(8*1024*1024);

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: {
        fileSize: maxsize
    }
});

router.get("/",aController.login);
router.post("/login/create",aController.adminLogin);

router.get("/dashboard",utils.authAdmin,aController.admin_dashboard);
router.get("/activeUser/:id",aController.activeUser)
router.get("/deactiveUser/:id",aController.deactiveUser)
router.get("/logout",aController.admin_logout);

// campgallery
router.get("/campgallery",utils.authAdmin,aController.campgallery)
router.get('/addcampgallerydata',aController.addCampgallery)
router.post('/createcampgallery',aController.create)
router.get('/deletecampgallery/:id',aController.deleteCampgallery )
//contact
router.get('/Contact',utils.authAdmin,aController.Contact)
router.post("/addcontact",aController.addContact);
router.get('/deletecontact/:id',aController.deletecontact)
// about
router.get('/about',utils.authAdmin,aController.About)
router.get('/addabout',aController.addabout)
router.post('/createabout',aController.createabout)
router.get('/deleteabout/:id',aController.deleteabout)
//doctors
router.get("/doctors",utils.authAdmin,aController.doctor);
router.post("/addDoctor",upload.single('image'),aController.addDoctor);
router.get("/edit_doctor/:id",utils.authAdmin,aController.editDoctor);
router.post("/doctor/update/:id",upload.single('image'),aController.updateDoctor);
router.get("/doctor/delete/:id",aController.deleteDoctor)
//appointments
router.get("/getAppointments",utils.authAdmin,aController.getAppointment)
router.post("/addAppointment",aController.addAppointment)
router.get("/deleteAppointment/:id",aController.deleteAppointment)


module.exports = router;