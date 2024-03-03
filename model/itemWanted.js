const mongoose = require("mongoose");
const conn = mongoose.createConnection("mongodb://localhost:27017/tmuclassifieds");

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

const itemWanted = conn.model("itemWanted", itemWantedSchema, "itemwanteds");
module.exports = itemWanted;