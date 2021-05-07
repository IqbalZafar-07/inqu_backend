const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const products = require("./routes/products");
const locations = require("./routes/locations");
const productmovements = require("./routes/productmovements");
const app = express();

mongoose
  .connect(
    "mongodb+srv://Iqbal:Iqbal@cluster0.xhw7w.mongodb.net/iqubit?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to mongo db..."))
  .catch((err) => console.log("could not connect to mongo db...", err));

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// const Product = mongoose.model("Product", currSchema);

// async function createProduct() {
//   const product = new Product({
//     product_id: "123",
//   });
//   const result = await product.save();
//   console.log(result);
// }

// // createProduct();

app.use("/api/products", products);
app.use("/api/locations", locations);
app.use("/api/productmovements", productmovements);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
