const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    description: Joi.string().min(2).required(),
  });

  return schema.validate(product);
}

module.exports.Product = Product;
module.exports.validate = validateProduct;
