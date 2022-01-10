const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chatController");
// const checkAuth = require("../middleware/check-auth");
// const isAdmin = require("../middleware/is-admin");

router.post("/send", ChatController.sendMessageController);

module.exports = router;
