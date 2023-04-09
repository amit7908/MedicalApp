const express = require("express");
const bodyParser = require("body-parser")
const aController = require("../controller/adminController")
const utils =require("../utils/utils")


const router = express.Router();

router.use(bodyParser.urlencoded({ extended : true}));
router.use(bodyParser.json());

router.get("/",aController.login);
router.post("/login/create",aController.adminLogin);

router.get("/dashboard",utils.authAdmin,aController.admin_dashboard);
router.get("/logout",aController.admin_logout);
// campgallery
router.get("/campgallery",aController.campgallery)
router.get('/addcampgallerydata',aController.addCampgallery)
router.post('/createcampgallery',aController.create)
router.get('/deletecampgallery/:id',aController.deleteCampgallery )
//contact
router.get('/Contact',aController.Contact)
router.post("/addcontact",aController.addContact);
router.get('/deletecontact/:id',aController.deletecontact)
// about
router.get('/about',aController.About)
router.get('/addabout',aController.addabout)
router.post('/createabout',aController.createabout)
router.get('/deleteabout/:id',aController.deleteabout)

module.exports = router;