const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventsSchema = new Schema(
  {
    eventname: String,
    description: String,
    organiser: String,
    price: Number,
    date: String,
    time: String,
    status: String,
    thumb: String,
    area: String,
    category: String,
    number: Number,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// singular capitalized name for the mongo collection - Products
const Event = mongoose.model("Event", EventsSchema);

module.exports = Event;
