// models/survey.js

// Import the database
const db = require('../db/config');

const Survey = {};

// Define methods for the Survey object

// Returns all surveys from the table
Survey.findAll = () => {
    return db.query(
        `SELECT * FROM surveys`
    );
};

// Return one survey with the specific id
Survey.findById = (id) => {
    return db.oneOrNone(
        `
      SELECT * FROM surveys
      WHERE id = $1
    `,
        [id]
    );
};

// Insert a survey results into the database
Survey.addSurvey = (survey, results) => {
    return db.none('INSERT INTO surveys(survey, results) VALUES($1, $2)', [survey, JSON.stringify(results)])
}

// Export the Survey object
module.exports = Survey;