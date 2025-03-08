const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/secret-token");

const User = require("../models/user.model");

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

        const user = await User.create({ firstName, lastName, email, password,profileImagePath });
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
        delete user.password;
        res.status(200).json({message: "User registered successfully!", user, token});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Registration failed!", error: err.message});
    }
};

module.exports = { register, login }