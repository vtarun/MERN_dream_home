const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        guestCount: {
            type: Number,
            required: true,
        },
        bedroomCount: {
            type: Number,
            required: true,
        },
        bedCount: {
            type: Number,
            required: true,
        },
        bathroomCount: {
            type: Number,
            required: true,
        },
        listingPhotoPaths: [{ type: String }],
        amenities: {type: Array, default: []},
        description: {
            title: { type: String, required: true, trim: true },
            description: { type: String, required: true, trim: true },
            highlight: { type: String, required: true },
            highlightDesc: { type: String, required: true },
            price: { type: Number, required: true, default: 0 }
        },
        location: {
            streetAddress: { type: String, required: true, trim: true },
            aptSuite: { type: String, required: true, trim: true },
            city: { type: String, required: true, trim: true },
            province: { type: String, required: true, trim: true },
            country: { type: String, required: true, trim: true }
        },
    }, 
    { timestamps: true}
);

module.exports = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);