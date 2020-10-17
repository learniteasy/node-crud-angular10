const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Get All
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get One
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

//Create One
router.post("/", async (req, res) => {
  const product = new Product({ 
    name: req.body.name,
    description: req.body.description,
    available: req.body.available,
    brand: req.body.brand,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json({ newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Patch One
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.available != null) {
    res.product.available = req.body.available;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Put One
router.put("/:id", getProduct, async (req, res) => {
  try {
    const updatedProduct = await res.product.set(req.body);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete One
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: "Product has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getProduct middleware
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find Product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
