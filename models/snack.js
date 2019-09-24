const db = require('../db/config');

const Snack = {};

Snack.findAll = () => {
  return db.query(
    `SELECT * FROM snacks`
  );
};

// Return one survey with the specific id
Snack.findById = (id) => {
  return db.oneOrNone(
    `
      SELECT * FROM snacks
      WHERE id = $1
    `,
    [id]
  );
};

Snack.findByName = (name) => {
  return db.query(
    `
      SELECT * FROM snacks
      WHERE name = $1
    `,
    [name]
  );
};

// Insert a snack into the database
Snack.addSnack = (uid, survey, results) => {
  return db.oneOrNone(`
            INSERT INTO snacks(name, price, description, upc) 
            VALUES($1, $2, $3, $4)
            RETURNING id
        `, [name, price, description, upc])
}

// Export the Snack object
module.exports = Snack;
