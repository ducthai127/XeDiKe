const express = require("express");
const tripController = require("./trip");
const { authenticating, authorizing } = require("../../../middlewares/auth");

const router = express.Router();

// driver
router.post(
  "/create-trip",
  authenticating,
  authorizing("driver"),
  tripController.createTrip
);

// passenger
router.post(
    "/book-trip/:tripId",
    authenticating,
    authorizing("passenger"),
    tripController.bookTrip
  );


module.exports = router;
