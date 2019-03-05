const express = require("express");
const router = express.Router();
const propertiesController = require("../controllers/propertiesController");

// =================
// PROPERTY ROUTES
// =================

// Get all properties
router.get("/", propertiesController.show_all_properties);

// Get all rentals
router.get("/rentals", propertiesController.show_all_rental_properties);

// Get all sale properties
router.get("/sale", propertiesController.show_all_sale_properties);

// Get a single property
router.get("/:property_id", propertiesController.show_property_details);

module.exports = router;
