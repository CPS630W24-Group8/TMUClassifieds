const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb+srv://duong1vu:Nightwing299@tmuclassifieds.b71fwg2.mongodb.net/?retryWrites=true&w=majority&appName=tmuclassifieds");

const itemSaleSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    required: true
  },
});

const itemSale = db.model("itemSale", itemSaleSchema, "itemsales");
module.exports = itemSale;