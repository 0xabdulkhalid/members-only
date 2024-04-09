const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

router.get("/", messagesController.show_messages);

router.post("/", messagesController.create_message);

router.post("/delete", messagesController.delete_message);

module.exports = router;
