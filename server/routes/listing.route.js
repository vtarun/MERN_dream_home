const router = require("express").Router();
const multer = require("multer");
const { createNewListing, getAllListing, getListingById, searchListings } = require("../controllers/listing.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else{
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({storage, fileFilter});

router.get('/', getAllListing);
router.get("/:listingId", getListingById);
router.get("/:listingId", getListingById);
router.get("/search/:search", searchListings);
router.post('/create', upload.array('listingPhotos'), createNewListing);

module.exports = router;