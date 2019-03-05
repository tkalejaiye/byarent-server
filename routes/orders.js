const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// ==============
// ORDER ROUTES
// ==============

// Add a new order
router.post("/", ordersController.create_order);

// Display an order
router.get("/:orderId", ordersController.show_order);

module.exports = router;
