const express = require("express")
const uController = require("../controller/userControllerr");
const bodyParser = require("body-parser");
const verify = require("../middleware/verify");
const utils =require("../utils/utils")

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/',uController.home);
router.get("/about",uController.about);
router.get("/doctor",uController.doctor)
router.get("/doctor/department/:category",uController.department);
// router.get("/blog",uController.blog);
// router.get("/blog_detail",uController.blog_detail);
router.get("/contact",uController.contact);
router.get('/register', uController.register);
router.get('/dentistry', uController.dentistry);
router.get('/cardiology', uController.cardiology);
router.get('/ent_specialist', uController.ent_specialist);
router.get('/orthopedic', uController.orthopedic);
router.get('/neuroanatomy', uController.neuro);
router.get('/medicine', uController.medicine);
router.get('/appointment_form', uController.appointment);
router.post('/register/create',[verify.checkEmali],uController.registerCreate)
router.get('/login',uController.login);
router.post('/login/create',uController.loginCreate);
// router.get('/dashboard',utils.authUser,uController.dashboard);
router.get('/logout',uController.logout);
router.get("/confirmation/:email/:token",uController.confirmaton);

//appointment routes 



// router.get('/signin_signup',uController.signin_signup);


module.exports = router;
