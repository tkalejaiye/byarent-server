var mongoose = require("mongoose");
var propertySchema = require("./property.js").schema;

var cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  items: { type: [propertySchema] }
});

module.exports = mongoose.model("cart", cartSchema);
