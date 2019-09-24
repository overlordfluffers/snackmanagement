// routes/snack-routes.js

// Import express
const express = require('express');
// Define the router using the express router
const snackRouter = express.Router();

// Import the snacksController
const snackController = require('../controllers/snack-controller');

// For each route access the correct controller method

// Request all snacks, send it to the / route
snackRouter.get('/', snackController.findAll);

// Request single snack, send it to the /:id route
snackRouter.get('/:id', snackController.findById);

snackRouter.get('/name/:name', snackController.findByName);

// Request to add a single snack to the DB
snackRouter.post('/addSnack', snackController.addSurvey)

// Export the router
module.exports = snackRouter;
