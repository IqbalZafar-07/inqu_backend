const _ = require("lodash");
const { Productmovement, validate } = require("../model/productmovement");
const { Location } = require("../model/location");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let productmovement = await Productmovement.find();
  res.send(productmovement);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  if (!from_location_id) {
  }

  let productmovement = new Productmovement({
    from_location_id: req.body.from_location_id,
    to_location_id: req.body.to_location_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    timestamp: Date.now(),
  });

  productmovement = await productmovement.save();
  res.send(productmovement);
});

router.delete("/:id", async (req, res) => {
  // console.log("inside delete", req.params);
  const productmovement = await Productmovement.findByIdAndRemove(
    req.params.id
  );

  if (!productmovement)
    return res.status(404).send("No posts are available for this ID");
});

router.get("/:id", async (req, res) => {
  const productmovement = await Productmovement.findById(req.params.id);

  if (!productmovement)
    return res.status(404).send("No posts are available for this ID");
  res.send(productmovement);
});

module.exports = router;
