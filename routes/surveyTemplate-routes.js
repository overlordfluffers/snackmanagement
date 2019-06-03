// routes/surveyTemplate-routes.js

// Import express
const express = require('express');
// Define the router using the express router
const surveyTemplateRouter = express.Router();

// Import the surveyTemplatesController
const surveyTemplateController = require('../controllers/surveyTemplate-controller');

// For each route access the correct controller method

// Request all surveyTemplates, send it to the / route
surveyTemplateRouter.get('/', surveyTemplateController.findAll);

// Request single surveyTemplate, send it to the /:id route
surveyTemplateRouter.get('/:id', surveyTemplateController.findById);

// Request to add a single surveyTemplate to the DB
surveyTemplateRouter.post('/addTemplate', surveyTemplateController.addSurveyTemplate)

// Export the router
module.exports = surveyTemplateRouter;