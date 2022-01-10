const sendMessageController = (req, res) => {
  const chatMessage = req.body.message;
  const chatUser = req.body.userName;
  // socket.emit(`${chatUser}: ${chatMessage}`);
  console.log(chatMessage);
  res.status(200).json({ message: "Hooray" });
  return;
};

module.exports = {
  sendMessageController,
};
