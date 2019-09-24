CREATE TABLE "transaction"
(
    "id"     int NOT NULL,
    "price"  money NOT NULL,
    "date"   date NOT NULL,
    "amount" int NOT NULL,
    "user"   int NOT NULL,
    "snack"  int NOT NULL
);

CREATE UNIQUE INDEX "PK_transaction" ON "transaction"
    (
     "id"
        );

