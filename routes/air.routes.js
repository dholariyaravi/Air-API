module.exports = (app) => {
    const connections = require("../controllers/air.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", connections.create);
  
    // Retrieve all connections
    router.get("/", connections.findAll);
  
    // Retrieve all published connections
    router.get("/published", connections.findAllPublished);
  
    // Update a Tutorial with id
    router.put("/:id", connections.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", connections.delete);
  
    app.use("/api/Air", router);
  };
  