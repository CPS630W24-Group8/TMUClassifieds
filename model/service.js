const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb+srv://duong1vu:Nightwing299@tmuclassifieds.b71fwg2.mongodb.net/?retryWrites=true&w=majority&appName=tmuclassifieds");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true
  },
});

const service = db.model("service", serviceSchema, 'services');
module.exports = service;