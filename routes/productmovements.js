const _ = require("lodash");
const { Productmovement, validate } = require("../model/productmovement");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let productmovement = await Productmovement.find();
  res.send(productmovement);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  let productmovement = new Productmovement({
    from_location_id: req.body.from_location_id,
    to_location_id: req.body.to_location_id,
    movement_id: req.body.movement_id,
    timestamp: Date.now(),
  });

  productmovement = await productmovement.save();
  res.send(productmovement);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const productmovement = await Productmovement.findByIdAndUpdate(
    req.params.id,
    {
      from_location_id: req.body.from_location_id,
      to_location_id: req.body.to_location_id,
      movement_id: req.body.movement_id,
      timestamp: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!productmovement)
    return res.status(404).send("No productmovement are available for this ID");

  res.send(productmovement);
});

router.get("/:id", async (req, res) => {
  const productmovement = await Productmovement.findById(req.params.id);

  if (!productmovement)
    return res.status(404).send("No posts are available for this ID");
  res.send(productmovement);
});

module.exports = router;
