const { required } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const productmovementSchema = new mongoose.Schema({
  to_location_id: {
    type: String,
    required: true,
  },
  from_location_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Productmovement = mongoose.model(
  "Productmovement",
  productmovementSchema
);

function validateProductmovement(productmovement) {
  const schema = Joi.object({
    to_location_id: Joi.string().required(),
    from_location_id: Joi.string().required(),
    product_id: Joi.string().required(),
    quantity: Joi.string().required(),
  });

  return schema.validate(productmovement);
}

module.exports.Productmovement = Productmovement;
module.exports.validate = validateProductmovement;
