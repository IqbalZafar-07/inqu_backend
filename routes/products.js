const _ = require("lodash");
const { Product, validate } = require("../model/product");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let products = await Product.find();
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  let product = new Product({
    product_id: req.body.product_id,
    description: req.body.description,
  });

  product = await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      product_id: req.body.product_id,
      description: req.body.description,
    },
    {
      new: true,
    }
  );
  if (!product)
    return res.status(404).send("No product are available for this ID");

  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("No product are available for this ID");
  res.send(product);
});

module.exports = router;
