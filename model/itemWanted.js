const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb+srv://duong1vu:Nightwing299@tmuclassifieds.b71fwg2.mongodb.net/?retryWrites=true&w=majority&appName=tmuclassifieds");

const itemWantedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const itemWanted = db.model("itemWanted", itemWantedSchema, "itemwanteds");
module.exports = itemWanted;