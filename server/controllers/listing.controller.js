const mongoose = require("mongoose");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");

const createNewListing = async (req, res) => {
    try{
        const {
            creator,
            category,
            type,
            location: {
                streetAddress,
                aptSuite,
                city,
                province,
                country
            },
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            description: {
                title,
                description,
                highlight,
                highlightDesc,
                price
            }
        } = {...req.body, location : JSON.parse(req.body.location), description : JSON.parse(req.body.description)};
        

        const UserExists = await User.findById(creator);
        if(!UserExists){
            return res.status(404).json({message: "User not found"});
        }        

        const listingPhotos = req.files;
        if(!listingPhotos) {
            return res.status(400).json({message: "Please upload at least one photo"});
        }

        const listingPhotoPaths = listingPhotos.map(file => file.path);

        const newListing = await Listing.create({
            creator,
            category,
            type,
            location: {
                streetAddress,
                aptSuite,
                city,
                province,
                country
            },
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            description: {
                title,
                description,
                highlight,
                highlightDesc,
                price
            }
        });

        res.status(201).json({listing: newListing});

    } catch(e){
        console.error(e);
        res.status(500).json({message: "Internal Server Error"});
    }
};


const getAllListing = async (req, res) => {
    const qCategory = req.query.category;
    try{
        let listings;
        if(qCategory) {
            listings = await Listing.find({category: qCategory}).populate("creator");
        } else {
            listings = await Listing.find().populate("creator");
        }

        res.status(200).json(listings);
    } catch(e){
        console.error(e);
        res.status(404).json({message: "Category not found!", error: e.message});   
    }
};

/* LISTING DETAILS */
const getListingById = async (req, res) => {
    try {
      const { listingId } = req.params
      const listing = await Listing.findById(listingId).populate("creator")
      res.status(202).json(listing)
    } catch (err) {
      res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
};

const  searchListings =  async (req, res) => {
    const { search } = req.params
  
    try {
      let listings = [];
  
      if (search === "all") {
        listings = await Listing.find().populate("creator")
      } else {
        listings = await Listing.find({
          $or: [
            { category: {$regex: search, $options: "i" } },
            { title: {$regex: search, $options: "i" } },
          ]
        }).populate("creator")
      }
  
      res.status(200).json(listings)
    } catch (err) {
      res.status(404).json({ message: "Fail to fetch listings", error: err.message })
      console.log(err)
    }
};

module.exports = { createNewListing, getAllListing, getListingById, searchListings };