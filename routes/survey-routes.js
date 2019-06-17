// routes/survey-routes.js

// Import express
const express = require('express');
// Define the router using the express router
const surveyRouter = express.Router();

// Import the surveysController
const surveyController = require('../controllers/survey-controller');

// For each route access the correct controller method

// Request all surveys, send it to the / route
surveyRouter.get('/', surveyController.findAll);

// Request single survey, send it to the /:id route
surveyRouter.get('/:id', surveyController.findById);

surveyRouter.get('/:name', surveyController.findByName);

// Request to add a single survey to the DB
surveyRouter.post('/addSurvey', surveyController.addSurvey)

// Export the router
module.exports = surveyRouter;