const mongoose = require("mongoose");
const conn = mongoose.createConnection("mongodb://localhost:27017/tmuclassifieds");

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
});

const itemSale = conn.model("itemSale", itemSaleSchema);
module.exports = itemSale;