const Products = require("../models/product.js");
const mongoose = require("mongoose");
exports.get_all_products = (req, res) => {
  Products.find()
    .then((results) => {
      if (results.length > 0) {
        res.status(200).json({
          method: "GET",
          data: results
        });
      } else {
        res.status(404).json({
          error: "rords not found"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_single_product = (req, res) => {
  const { productId } = req.params;

  Products.findById(productId)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "No records found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      });
    });
};

exports.create_product = (req, res) => {
  const newProduct = req.body;
  const product = new Products({
    _id: new mongoose.Types.ObjectId(),
    ...newProduct,
    productImage: req.file.path
  });
  product
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  res.status(201).json({
    name: "welcome post",
    data: req.body
  });
};

exports.update_product = (req, res) => {
  const { productId } = req.params;
  let updateOp = {};
  for (const obj of req.body) {
    updateOp[obj.propName] = obj.value;
  }
  Products.update({ _id: productId }, { $set: updateOp })
    .exec()
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(500).json({});
    });
};

exports.delete_product = (req, res) => {
  const { productId } = req.params;
  Products.deleteOne({ _id: productId })
    .exec()
    .then((results) => {
      console.log(results);
      res.status(200).json({
        status: "Successfull delete"
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      });
    });
};
