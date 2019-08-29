// models/surveytemplate.js

// Import the database
const db = require('../db/config');

const SurveyTemplate = {};

// Define methods for the SurveyTemplate object

// Returns all surveytemplates from the table
SurveyTemplate.findAll = () => {
    return db.query(
        `SELECT * FROM surveytemplates`
    );
};

// Return one surveytemplate with the specific id
SurveyTemplate.findById = (id) => {
    return db.oneOrNone(
        `
      SELECT * FROM surveytemplates
      WHERE id = $1
    `,
        [id]
    );
};

// Insert a surveytemplate results into the database
SurveyTemplate.addSurveyTemplate = (generateId, surveyname, template) => {
    return db.none('INSERT INTO surveytemplates(generateId ,surveyname, template) VALUES($1, $2, $3)', [generateId, surveyname, JSON.stringify(template)])
}

// Export the SurveyTemplate object
module.exports = SurveyTemplate;