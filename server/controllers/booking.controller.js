const Booking = require("../models/booking.model");

const createNewBooking = async (req, res) => {
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
        const newBooking = new Booking({
            customerId,
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
        });

        await newBooking.save();

        res.status(201).json(newBooking);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createNewBooking };