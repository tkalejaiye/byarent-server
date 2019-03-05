var mongoose = require("mongoose");
var propertySchema = require("./property.js").schema;

var orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: [propertySchema] }
});

module.exports = mongoose.model("order", orderSchema);
