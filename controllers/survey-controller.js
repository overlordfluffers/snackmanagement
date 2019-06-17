// controllers/survey-controller.js

// Import the Survey model.
const Survey =  require('../models/survey');

// Instantiate the controller object
const surveyController = {};

// Controller method for handling a request for all surveys
surveyController.findAll = (req, res) => {
    // Uses the findAll method from Survey
    Survey.findAll()
        .then(surveys => {
            // Sends the surveys as a JSON object
            res.json({
                message: 'Success',
                data: surveys
            });
        })
        .catch(err => {
            // If something goes wrong it logs the error in the console and sends it as a JSON object
            console.log(err);
            res.status(500).json({err});
        });
};

// Controller method for handling a request for a single survey
surveyController.findById = (req, res) => {
    // Surveys method for finding by id, passes the id as an argument
    Survey.findById(req.params.id)
        .then(survey => {
            // Sends the survey as a JSON object
            res.json({
                message: "Success",
                data: survey
            });
        })
        .catch(err => {
            // If something goes wrong it logs the error in the console and sends it as a JSON object
            console.log(err);
            res.status(500).json({err});
        });
};

// Controller method for handling a request for a single survey
surveyController.findByName = (req, res) => {
    // Surveys method for finding by id, passes the id as an argument
    Survey.findByName(req.params.name)
        .then(survey => {
            // Sends the survey as a JSON object
            res.json({
                message: "Success",
                data: survey
            });
        })
        .catch(err => {
            // If something goes wrong it logs the error in the console and sends it as a JSON object
            console.log(err);
            res.status(500).json({err});
        });
};

// Controller method for inserting a survey into the table
surveyController.addSurvey = (req, res) => {
    // Surveys method for adding a result to the server
    Survey.addSurvey(req.body.survey, req.body.results)
        .then(id =>{
            res.status(200).json({
                message: "Success",
                data: id
            });
        })
        .catch(err => {
            // If something goes wrong it logs the error in the console and sends it as a JSON object
            console.log(err);
            res.status(500).json({err});
        });
};

// Export the controller
module.exports = surveyController;