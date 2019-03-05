var mongoose = require("mongoose");

var propertySchema = new mongoose.Schema({
  propertyName: { type: String, required: true },
  typeOfProperty: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  pictures: { type: [String] }
});

module.exports = mongoose.model("property", propertySchema);
