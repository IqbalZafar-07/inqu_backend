const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

function validateLocation(location) {
  const schema = Joi.object({
    location_id: Joi.string().required(),
    description: Joi.string().min(2).required(),
  });

  return schema.validate(location);
}

module.exports.Location = Location;
module.exports.validate = validateLocation;
