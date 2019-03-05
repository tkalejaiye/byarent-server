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
      res.send("No  properties have been created yet :(");
    }
  });
};

// Create a property
exports.create_property = (req, res) => {
  const property = new Property(req.body);
  console.log(property);

  property.save(err => {
    if (err) {
      res.send(err);
    }
  });

  res.send("Property created: " + property);
};

// Edit a property
exports.edit_property = (req, res) => {
  Property.findByIdAndUpdate(
    req.params.property_id,
    req.body,
    { new: true },
    (err, updatedProperty) => {
      if (err) {
        return res.send(err);
      }
      return res.send(updatedProperty);
    }
  );
};

// Delete a property
exports.delete_property = (req, res) => {
  Property.findByIdAndDelete(
    { _id: req.params.property_id },
    (err, property) => {
      if (err) {
        return err;
      }

      res.send("Delete Successful");
    }
  );
};
