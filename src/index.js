const express = require("express");
const bodyParser = require("body-parser");
require("./Connection.js");
const productsRoute = require("./routes/products.js");
const ordersRoute = require("./routes/orders.js");
const userRoute = require("./routes/user.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Welcome to Home");
});

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/users", userRoute);

app.use((req, res, next) => {
  const error = new Error("page not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status || 500) {
    res.status(error.status).json({
      error: {
        message: error.message
      }
    });
  }
});

app.listen(8080);
