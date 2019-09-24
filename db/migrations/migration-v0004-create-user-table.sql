CREATE TABLE "user"
(
    "uid"        int NOT NULL,
    "first_name" varchar(50) NOT NULL,
    "last_name"  varchar(50) NOT NULL,
    "email"      varchar(50) NOT NULL,
    "unit_id"    int NOT NULL,
    "password"   text NOT NULL
);

CREATE UNIQUE INDEX "PK_user" ON "user"
    (
     "uid"
        );
