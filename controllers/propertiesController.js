const mongoose = require("mongoose");
const Property = require("../models/property");

// Display all properties
exports.show_all_properties = (req, res) => {
  Property.find({}, (err, properties) => {
    if (err) {
      return err;
    }

    if (properties.length > 0) {
      res.send(properties);
    } else {
      res.send("No properties have been created yet :(");
    }
  });
};

// Display all rental properties
exports.show_all_rental_properties = (req, res) => {
  Property.find({ typeOfProperty: "rental" }, (err, rentalProperties) => {
    if (err) {
      return err;
    }

    if (rentalProperties.length > 0) {
      res.send(rentalProperties);
    } else {
      res.send("No rental properties have been created yet :(");
    }
  });
};

// Display all for sale properties
exports.show_all_sale_properties = (req, res) => {
  Property.find({ typeOfProperty: "for sale" }, (err, saleProperties) => {
    if (err) {
      return err;
    }

    if (saleProperties.length > 0) {
      res.send(saleProperties);
    } else {
      res.send("No for sale properties have been created yet :(");
    }
  });
};

// Display details page for a single property
exports.show_property_details = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.property_id)) {
    return res.send("Invalid Property Id");
  }
  Property.findById(req.params.property_id, (err, property) => {
    if (err) {
      return res.send(err);
    }
    res.send(property);
  });
};
