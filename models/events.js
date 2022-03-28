const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventsSchema = new Schema(
  {
    eventname: String,
    description: String,
    host: String,
    price: Number,
    status: String,
    thumb: String,
    area: String,
    category: String,
    number: Number,
  },
  { timestamps: true }
);

// singular capitalized name for the mongo collection - Products
const Event = mongoose.model("Event", EventsSchema);

module.exports = Event;
