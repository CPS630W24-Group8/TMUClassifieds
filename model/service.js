const mongoose = require("mongoose");
const conn = mongoose.createConnection("mongodb://localhost:27017/tmuclassifieds");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const service = conn.model("service", serviceSchema, 'services');
module.exports = service;