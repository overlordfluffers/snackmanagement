CREATE TABLE "local_snacks"
(
    "id"             int NOT NULL,
    "price"          money NOT NULL,
    "purchase_price" money NOT NULL,
    "quantity"       int NOT NULL,
    "unit_id"        int NOT NULL,
    "snacko"         int NOT NULL,
    "snack"          int NOT NULL
);


CREATE UNIQUE INDEX "PK_local_snacks" ON "local_snacks"
    (
     "id"
        );









