const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productschema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    required: false,
    default: new Date()
  },
  available: {
    type: Boolean,
    required: false
  }
    
});

const Product = mongoose.model("Product", productschema);
module.exports = Product;
