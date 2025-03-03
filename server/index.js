const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log("Server listening on port: " + PORT);
    });
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB', error);
  });