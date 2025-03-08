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
        amenities: [{type: String}],
        description: {
            title: { type: String },
            description: { type: String },
            highlight: { type: String },
            highlightDesc: { type: String },
            price: { type: Number, default: 0 }
        },
        location: {
            streetAddress: { type: String },
            aptSuite: { type: String },
            city: { type: String },
            province: { type: String },
            country: { type: String }
        },

    }, 
    { timestamps: true}
);

module.exports = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);