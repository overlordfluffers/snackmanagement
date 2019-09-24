// controllers/snack-controller.js

// Import the snack model.
const snack =  require('../models/snack');

// Instantiate the controller object
const snackController = {};

// Controller method for handling a request for all snacks
snackController.findAll = (req, res) => {
  // Uses the findAll method from snack
  snack.findAll()
    .then(snacks => {
      // Sends the snacks as a JSON object
      res.json({
        message: 'Success',
        data: snacks
      });
    })
    .catch(err => {
      // If something goes wrong it logs the error in the console and sends it as a JSON object
      console.log(err);
      res.status(500).json({err});
    });
};

// Controller method for handling a request for a single snack
snackController.findById = (req, res) => {
  // snacks method for finding by id, passes the id as an argument
  snack.findById(req.params.id)
    .then(snack => {
      // Sends the snack as a JSON object
      res.json({
        message: "Success",
        data: snack
      });
    })
    .catch(err => {
      // If something goes wrong it logs the error in the console and sends it as a JSON object
      console.log(err);
      res.status(500).json({err});
    });
};

// Controller method for handling a request for a single snack
snackController.findByName = (req, res) => {
  // snacks method for finding by id, passes the id as an argument
  snack.findByName(req.params.name)
    .then(snack => {
      // Sends the snack as a JSON object
      res.json({
        message: "Success",
        data: snack
      });
    })
    .catch(err => {
      // If something goes wrong it logs the error in the console and sends it as a JSON object
      console.log(err);
      res.status(500).json({err});
    });
};

// Controller method for inserting a snack into the table
snackController.addsnack = (req, res) => {
  // snacks method for adding a result to the server
  snack.addsnack(req.body.name, req.body.price, req.body.description, req.body.upc)
    .then(() =>{
      res.status(200).json({
        message: "Success",
      });
    })
    .catch(err => {
      // If something goes wrong it logs the error in the console and sends it as a JSON object
      console.log(err);
      res.status(500).json({err});
    });
};

// Export the controller
module.exports = snackController;
