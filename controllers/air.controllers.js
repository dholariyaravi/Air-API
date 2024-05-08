const Tutorial = require("../models/air.db.js");

// Define image URLs based on flight_name
const flightImages = {
  "IndiGo": "https://airiq.in/img/indigo.png",
  "Akasa Air": "https://airiq.in/img/akasaair.png",
  "Vistara": "https://airiq.in/img/vistara.png",
  "SpiceJet": "https://airiq.in/img/spicejet.png" 
};

function getImageUrl(flightName) {
  return flightImages[flightName] || '';
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const imageUrl = getImageUrl(req.body.flight_name);
  
    // Create a Tutorial
    const tutorial = new Tutorial({
      id: req.body.id,
      flight_name: req.body.flight_name,
      origin: req.body.origin,
      destination: req.body.destination,
      flight_type: req.body.flight_type,
      travel_date: req.body.travel_date,
      flight_number: req.body.flight_number,
      departure_time: req.body.departure_time,
      arrival_time: req.body.arrival_time,
      tour_code: req.body.tour_code,
      num_seats: req.body.num_seats,
      image_url: imageUrl
    });
  
    // Save Tutorial in the database
    Tutorial.create(tutorial, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
  };

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const flight_name = req.query.flight_name;
  
    Tutorial.getAll(flight_name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      // else res.send(data);
      else {
        // Add image_url field to each tutorial based on flight_name
        data.forEach(tutorial => {
          tutorial.image_url = flightImages[tutorial.flight_name] || '';
        });
        res.send(data);
      }
    });
  };

  
  exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

  // Retrieve all Tutorials from the database (with condition).
  exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };  

  // ======================================================== 
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log( "dddd",req.body);
  
    Tutorial.updateById(
      req.params.id,
      new Tutorial(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  // ======================================================== 
  exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tutorial with id " + req.params.id
          });
        }
      } else res.send({ message: `Tutorial was deleted successfully!` });
    });
  };

  // ======================================================== 
  
  exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };
 