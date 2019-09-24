CREATE TABLE "unit"
(
    "uid"     int NOT NULL,
    "name"    varchar(50) NOT NULL,
    "service" varchar(50) NOT NULL,
    "state"   varchar(50) NOT NULL,
    "city"    varchar(50) NOT NULL,
    "admin"   int NULL,
    "snacko"  int NULL
);

CREATE UNIQUE INDEX "PK_unit" ON "unit"
    (
     "uid"
        );

