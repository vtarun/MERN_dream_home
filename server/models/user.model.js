const mongoose = require("mongoose");

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
    wishList: {
        type: Array,
        default: []
    },
    propertyList: {
        type: Array,
        default: []
    },
    reservationList: {
        type: Array,
        default: []
    },
}, {timestamps: true});

userSchema.pre('save', async () => {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);