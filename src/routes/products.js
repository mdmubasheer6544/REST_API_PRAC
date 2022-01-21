const express = require("express");
const multer = require("multer");
const ProductController = require("../Controllers/products.js");
const router = express.Router();
const authCheck = require("../middleware/auth-check");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/", authCheck, ProductController.get_all_products);

router.get("/:productId", ProductController.get_single_product);

router.post(
  "/",
  upload.single("productImage"),
  ProductController.create_product
);

router.patch("/:productId", ProductController.update_product);
router.delete("/:productId", ProductController.delete_product);

module.exports = router;
