DROP TABLE IF EXISTS surveystemplates;

CREATE TABLE IF NOT EXISTS surveytemplates (
       id BIGSERIAL PRIMARY KEY,
       posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
       surveyname VARCHAR(64),
       template jsonb
);
