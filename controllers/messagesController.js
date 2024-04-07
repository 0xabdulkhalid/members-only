const asyncHandler = require("express-async-handler");
const Message = require("../models/message");

exports.create_message = asyncHandler(async (req, res, next) => {
  const message = new Message({
    text: req.body.content,
    author: req.user.fullname,
  });

  await message.save();
  return res.redirect("/messages");
});

exports.show_messages = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}).sort({ createdAt: 1 }).exec();

  res.render("messages", { messages: allMessages });
});
