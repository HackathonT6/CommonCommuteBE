const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authenticateToken");
// const checkAuth = require("../middleware/check-auth");
// const isAdmin = require("../middleware/is-admin");

router.post("/signup", UserController.signUpController);
router.post("/login", UserController.loginController);
router.get(
  "/getUserById",
  authenticateToken,
  UserController.getUserByIdController
);
router.put("/updatePreferences", authenticateToken, UserController.updatePref);
router.get("/getUserPrefs", authenticateToken, UserController.getUserPrefs);
router.get(
  "/getTopMatches/:userId",
  authenticateToken,
  UserController.getTopMatches
);
module.exports = router;
