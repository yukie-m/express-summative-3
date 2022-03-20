const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
  name: String,
  description: String,
  seller: String,
  price: Number,
  status: String,
  thumb: String,
  area: String,
  category: String,
  condition: String,
  item: String,
  collecting: String,
  size: String,
  rate: Number,
});

// singular capitalized name for the mongo collection - Products
const Product = mongoose.model("Product", ProductsSchema);

module.exports = Product;
