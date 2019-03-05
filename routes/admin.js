const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

// ===============
// ADMIN ROUTES
// ===============

// Display all properties
router.get("/properties/", adminController.show_all_properties);

// Create new property
router.post("/properties/", adminController.create_property);

// Edit property
router.put("/properties/:property_id", adminController.edit_property);

// Delete a property
router.delete("/properties/:property_id", adminController.delete_property);

module.exports = router;
