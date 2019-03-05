const mongoose = require("mongoose");
const Order = require("../models/order");

// Create a new order
exports.create_order = (req, res) => {
  const order = new Order(req.body);
  console.log(order);

  order.save(err => {
    if (err) {
      return res.send(err);
    }
  });

  return res.send("Order created: " + order);
};

// Display an order
exports.show_order = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
    return res.send("Invalid Order Id");
  }
  Order.findById(req.params.orderId, (err, order) => {
    if (err) {
      return res.send(err);
    }

    if (order) {
      return res.send(order);
    }
  });
};
