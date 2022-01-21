const mongoose = require("mongoose");
require("dotenv").config();
// const uri = process.env.MONGO_URI;
console.log(process.env.NAME);
const uri =
  "mongodb+srv://mubasheerMohammad:Muba123@cluster0.xe47m.mongodb.net/testingDb?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (!err) {
      console.log("connection success");
    } else {
      console.log(err);
    }
  }
);
