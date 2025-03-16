const router = require('express').Router();
const { getUserTrips, getUserProperties, updateUserWishList, getUserReservation, getUserWishList} = require('../controllers/user.controller');

router.get('/:userId/trips', getUserTrips);
router.get('/:userId/properties', getUserProperties);
router.get('/:userId/wishlists', getUserWishList);
router.patch("/:userId/:listingId", updateUserWishList);
router.get("/:userId/reservations", getUserReservation);

module.exports = router;