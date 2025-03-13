const router = require("express").Router();
const { createNewBooking } = require("../controllers/booking.controller");

router.post("/create", createNewBooking);

module.exports = router;
