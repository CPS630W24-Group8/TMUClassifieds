// https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide/
const mongoose = require("mongoose");
const localDB = "mongodb+srv://duong1vu:Nightwing299@tmuclassifieds.b71fwg2.mongodb.net/?retryWrites=true&w=majority&appName=tmuclassifieds";

// Connect to local mongoDB database
const connectDB = async () => {
  await mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected");
};

module.exports = connectDB;