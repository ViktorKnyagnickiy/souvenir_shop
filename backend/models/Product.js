const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  categoryId: Number
});

module.exports = mongoose.model("Product", productSchema);
