const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const app = express();
const { MONGO_URL, PORT } = process.env;

const authRoutes = require("./routes/auth.route");
const listingRoutes = require("./routes/listing.route");
const bookingRoutes = require("./routes/booking.route");
const userRoutes = require("./routes/user.route");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log("Server listening on port: " + PORT);
    });
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB', error);
  });