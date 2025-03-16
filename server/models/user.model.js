const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({    
    firstName: {
        type: String,
        required: [true, "Your first name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Your last name is required"],
    },
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },    
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    profileImagePath: {
        type: String,
        default: ""
    },
    tripList: {
        type: Array,
        default: []
    },
    wishList: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Listing'
    }],
    propertyList: {
        type: Array,
        default: []
    },
    reservationList: {
        type: Array,
        default: []
    },
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);