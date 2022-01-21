const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ orderName: "Samsung Tv" });
});

router.post("/", (req, res) => {
  res.status(201).json({
    order: "welcome to new order created"
  });
});

router.get("/:orderId", (req, res) => {
  res.status(200).json({
    order: "welcome single order",
    orderId: req.params.orderId
  });
});
router.put("/:orderId", (req, res) => {
  res.status(200).json({
    order: "welcome put order",
    orderId: req.params.orderId
  });
});
router.delete("/:orderId", (req, res) => {
  res.status(200).json({
    order: "welcome delete order",
    orderId: req.params.orderId
  });
});
module.exports = router;
