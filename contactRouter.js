const express = require("express");
const router = express.Router();
const chatRoom = require("./model/chatRoom");

// create new chat room and add to database
router.route("/add-room").post(async (request, response) => {
  const { user, otherUser, title } = request.body;
  console.log(title + " - " + user + ", " + otherUser);
  const users = [user, otherUser];
  try {
    await chatRoom.create({
      title, users
    }).then(room =>
      response.status(200).json({
        message: "Room successfully created",
        room,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Room not successfully created",
      error: error.mesage,
    });
  }
});

// check if specific chat room exist
router.route("/find-room").post(async (request, response) => {
  const { user, otherUser, title } = request.body;
  const users = [user, otherUser];
  try {
    chatRoom.find({ users: users, title: title }).then(data =>
      response.status(200).json({
        message: "Room sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Room not successful found",
      error: error.mesage,
    });
  }
});

// find all chats that user is in
router.route("/get-user-chat").get(async (request, response) => {
  const user = request.query.user;
  try {
    chatRoom.find({ users: user }).then(data =>
      response.status(200).json({
        message: "User's chats sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "User's chats not successful found",
      error: error.mesage,
    });
  }
});

// add message to chat
router.route("/add-message").post(async (request, response) => {
  const { user, room, message, date } = request.body;
  try {
    await chatRoom.findOneAndUpdate(
      { users: user, title: room },
      { $push: { messages: { date: date, user: user, body: message } } }
    ).then(data =>
      response.status(200).json({
        message: "User's message sucessfully added to chat",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "User's message not successfully added to chat",
      error: error.mesage,
    });
  }
});

// find a chat 
router.route("/get-chat").get(async (request, response) => {
  const user = request.query.user;
  const title = request.query.title;
  try {
    chatRoom.findOne({ users: user, title: title }).then(data =>
      response.status(200).json({
        message: "Chat sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Chat not successful found",
      error: error.mesage,
    });
  }
});

// remove user from all chat room
router.route("/remove-user-all-chat").post(async (request, response) => {
  const user = request.body.user;
  try {
    await chatRoom.updateMany(
      { users: user },
      { $pull: { users: user } }
    ).then(data =>
      response.status(200).json({
        message: "User sucessfully removed from all chats",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "User not successfully removed from all chats",
      error: error.mesage,
    });
  }
});

// remove user from one chat room
router.route("/remove-user").post(async (request, response) => {
  const {user, room} = request.body;
  try {
    await chatRoom.findOneAndUpdate(
      { users: user, title: room },
      { $pull: { users: user } }
    ).then(data =>
      response.status(200).json({
        message: "User sucessfully removed from chat",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "User not successfully removed from chat",
      error: error.mesage,
    });
  }
});

// remove user from chat room
router.route("/delete-room").post(async (request, response) => {
  const room = request.body.room;
  try {
    await chatRoom.deleteOne(
      { users: [], title: room }
    ).then(data =>
      response.status(200).json({
        message: "Chat room sucessfully deleted",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Chat room not successfully deleted",
      error: error.mesage,
    });
  }
});

module.exports = router;