const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
  messages: [{
    user: String,
    date: String,
    body: String
  }]
});

const chatRoom = mongoose.model("chatRoom", chatRoomSchema);
module.exports = chatRoom;