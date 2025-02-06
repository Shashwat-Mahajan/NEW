const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const path = require("path");

const methodOverride = require("method-override");
router.use(methodOverride("_method"));
router.use(express.urlencoded({extended: true}));
router.use(express.static(path.join(__dirname, "/public")));

const listingController = require("../controllers/listings.js");

const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router.route("/")
//ALL LISTINGS
.get(wrapAsync (listingController.index))
//Create ROUTE
.post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync( listingController.createListing));


//NEW ROUTE
router.get("/new", isLoggedIn ,listingController.renderNewForm);

router.route("/:id")
//SHOW ROUTE
.get( wrapAsync( listingController.showListing))
//UPDATE ROUTE
.put( isLoggedIn, isOwner ,upload.single('listing[image]') ,validateListing, wrapAsync(listingController.updateListing))
//DELETE ROUTE
.delete(isLoggedIn, isOwner ,wrapAsync( listingController.deleteListing));


//EDIT ROUTE
router.get("/:id/edit", isOwner ,isLoggedIn ,wrapAsync(listingController.renderEditForm));



module.exports = router;