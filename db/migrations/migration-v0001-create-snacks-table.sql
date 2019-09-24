CREATE TABLE "snacks"
(
    "id"          int NOT NULL,
    "name"        varchar(255) NOT NULL,
    "price"       money NOT NULL,
    "description" varchar(255) NOT NULL,
    "upc"         int NOT NULL

);

CREATE UNIQUE INDEX "PK_table_3" ON "snacks"
    (
     "id"
        );





















