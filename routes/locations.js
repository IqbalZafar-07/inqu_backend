const _ = require("lodash");
const { Location, validate } = require("../model/location");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let locations = await Location.find();
  res.send(locations);
});

router.post("/",  async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  let location = new Location({
    location_id: req.body.location_id,
    description: req.body.description,
  });

  location = await location.save();
  res.send(location);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const location = await Location.findByIdAndUpdate(
    req.params.id,
    {
      location_id: req.body.location_id,
      description: req.body.description,
    },
    {
      new: true,
    }
  );
  if (!location)
    return res.status(404).send("No location are available for this ID");

  res.send(location);
});

router.get("/:id", async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location)
    return res.status(404).send("No posts are available for this ID");
  res.send(location);
});

module.exports = router;
