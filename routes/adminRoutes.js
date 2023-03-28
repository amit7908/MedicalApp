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




module.exports = router;