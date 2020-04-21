const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser());

mongoose
  .connect("mongodb://gwuah:gwuah2018@ds253871.mlab.com:53871/watcher")
  .then(() => {
    console.log("Connected to db");
    app.listen(4545, () => {
      console.log("server running on 4545");
    });
  })
  .catch((err) => {
    console.log(err);
  });
