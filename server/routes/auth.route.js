const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/user.model");

// Multer storage setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

// File Filter (only image file)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({storage, fileFilter})

router.post("/register", upload.single('profileImage'), async (req, res, next) => {
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

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password,
            profileImagePath
        });

        await newUser.save();
    } catch(err) {

    }
})

module.exports = router;