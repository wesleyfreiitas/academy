var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controller/HomeController");
var UserController = require("../controller/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.get("/myAccount",AdminAuth,UserController.myAccount);
router.get("/account/password",AdminAuth,UserController.myAccountPassword);
router.get("/account/certificates",AdminAuth,UserController.myAccountCertificate);
router.get('/dashboard', AdminAuth ,HomeController.dashboard);
router.post('/authenticate', HomeController.authenticate);
router.get('/signup', UserController.index);
router.post('/create', UserController.create);
router.get("/logout",AdminAuth,UserController.logout);
router.post("/recoverpassword",UserController.recoverPassword);
router.get("/recoverpassword",UserController.viewRecover);
router.post("/changepassword",UserController.changePassword);
router.get("/changepassword/:token",UserController.viewChange);

module.exports = router;