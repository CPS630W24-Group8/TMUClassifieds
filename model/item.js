const mongoose = require("mongoose");
const conn = mongoose.createConnection("mongodb://localhost:27017/tmuclassifieds");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const item = conn.model("item", itemSchema, 'items');
module.exports = item;