DROP TABLE IF EXISTS surveytemplates;

CREATE TABLE IF NOT EXISTS surveytemplates (
       id BIGSERIAL PRIMARY KEY,
       posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
       generateId boolean,
       surveyname VARCHAR(64),
       template jsonb
);
