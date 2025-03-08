const router = require("express").Router();
const multer = require("multer");

const { register, login } = require("../controllers/user.controller");

// Multer storage setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public")
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
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

router.post("/register", upload.single('profileImage'), register);
router.post("/login", login);

module.exports = router;