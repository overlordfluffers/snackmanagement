DROP TABLE IF EXISTS surveys;

CREATE TABLE IF NOT EXISTS surveys (
    id BIGSERIAL PRIMARY KEY,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    survey VARCHAR(64),
    results jsonb
);
