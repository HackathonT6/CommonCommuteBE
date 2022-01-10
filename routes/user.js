const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
// const checkAuth = require("../middleware/check-auth");
// const isAdmin = require("../middleware/is-admin");

router.post("/signup", UserController.signUpController);

router.post("/login", UserController.loginController);

module.exports = router;
