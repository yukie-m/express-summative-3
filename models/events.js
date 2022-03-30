const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventsSchema = new Schema(
  {
    title: String,
    description: String,
    host: String,
    price: Number,
    date: String,
    time: String,
    thumb: String,
    location: String,
    category: String,
    attending: Number,
    link: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// singular capitalized name for the mongo collection - Products
const Event = mongoose.model("Event", EventsSchema);

module.exports = Event;
