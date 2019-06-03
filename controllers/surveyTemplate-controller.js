// controllers/surveyTemplate-controller.js

// Import the Survey model.
const SurveyTemplate =  require('../models/surveyTemplate');

// Instantiate the controller object
const surveyTemplateController = {};

// Controller method for handling a request for all surveyTemplates
surveyTemplateController.findAll = (req, res) => {
    // Uses the findAll method from SurveyTemplate
    SurveyTemplate.findAll()
        .then(surveyTemplates => {
            // Sends the surveyTemplates as a JSON object
            res.json({
                message: 'Success',
                data: surveyTemplates
            });
        })
        .catch(err => {
            // If something goes wrong it logs the error in the console and sends it as a JSON object
            console.log(err);
            res.status(500).json({err});
        });
};

// Controller method for handling a request for a single surveyTemplate
surveyTemplateController.findById = (req, res) => {
    // SurveyTemplates method for finding by id, passes the id as an argument
    SurveyTemplate.findById(req.params.id)
        .then(surveyTemplate => {
            // Sends the surveyTemplate as a JSON object
            res.json({
                message: "Success",
                data: surveyTemplate
            });
        })
        .catch(err => {
            // If something goes wrong it logs the error in the console and sends it as a JSON object
            console.log(err);
            res.status(500).json({err});
        });
};

// Controller method for inserting a surveyTemplate into the table
surveyTemplateController.addSurveyTemplate = (req, res) => {
    // SurveyTemplates method for adding a result to the server
    SurveyTemplate.addSurveyTemplate(req.body.surveyname, req.body.template)
        .then(not =>{
            res.status(200).json();
            return true
        })
        .catch(err => {
            // If something goes wrong it logs the error in the console and sends it as a JSON object
            console.log(err);
            res.status(500).json({err});
        });
};

// Export the controller
module.exports = surveyTemplateController;