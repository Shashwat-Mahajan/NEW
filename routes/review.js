const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing")
const Review = require("../models/review")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");



//REVIEW ROUTE
router.post("/", isLoggedIn ,validateReview ,wrapAsync(reviewController.createReview));


//DELETE REVIEW ROUTE
router.delete("/:reviewId", isLoggedIn, isReviewAuthor , wrapAsync(reviewController.deleteReview));

module.exports = router;