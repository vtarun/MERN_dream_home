const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { createSecretToken } = require("../util/secret-token");

const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const Listing = require("../models/listing.model");

const register = async (req, res, next) => {
    try{
        // Take all register form info
        const { firstName, lastName, email, password } = req.body;

        //  Theuploaded file is available as req.file 
        const profileImage = req.file;

        if(!profileImage) {
            return res.status(400).send("No file uploaded");
        }

        const profileImagePath = profileImage.path;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exists"});
        }

        const user = await User.create({ firstName, lastName, email, password, profileImagePath });
        res.status(200).json({message: "User registered successfully!", user});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Registration failed!", error: err.message});
    }
};

const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }
        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"}); 
        }
        const token = createSecretToken(user._id);
        res.status(200).json({message: "User registered successfully!", user, token});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Registration failed!", error: err.message});
    }
};

const getUserTrips = async (req, res) => {
    const { userId } = req.params;
    try{                
        const trips = await Booking.find({customerId: userId}).populate("customerId hostId listingId");
        res.status(200).json({message: "User trips fetched successfully", trips});
    } catch(err){
        console.log(err);
        res.status(404).json({message: "User trips not found", error: err.message});
    }
};

const getUserProperties = async (req, res) => {
    try{
        const { userId } = req.params;
        const properties = await Listing.find({ creator: userId }).populate('creator');
        res.status(200).json({message: "User properties fetched successfully", properties});
    } catch(err){
        console.log(err);
        res.status(404).json({message: "User properties not found", error: err.message});
    }
};

const updateUserWishList = async (req, res) => {
    try{
        const {userId, listingId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
      
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        const favouriteListing = user.wishList.find(listing => listing.toString() === listingId);
        if(favouriteListing) {
            user.wishList = user.wishList.filter(item => item.toString() !== listingId);
            await user.save();
            res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList });
        } else {
            user.wishList.push(listingId);
            await user.save();
            res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList });
        }
    } catch(err){
        console.error(`Error updating wish list for user ${userId}:`, err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUserReservation = async (req, res) => {
    try {
      const { userId } = req.params
      const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
      res.status(202).json(reservations)
    } catch (err) {
      console.log(err)
      res.status(404).json({ message: "Can not find reservations!", error: err.message })
    }
}

const getUserWishList = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const listings = await Listing.find({ _id: { $in: user.wishList } });
        res.status(200).json({ message: "Wish list fetched successfully", wishList: listings });
    }
    catch(err) {
        console.log(err);
        res.status(404).json({ message: "Can not find wish list!", error: err.message });
    }
};

module.exports = { register, login, getUserTrips, getUserProperties, updateUserWishList, getUserReservation, getUserWishList };