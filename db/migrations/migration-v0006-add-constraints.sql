
alter table local_snacks
    add constraint FK_49
        foreign key (unit_id) references unit (uid),
    add CONSTRAINT FK_52
        FOREIGN KEY ( snacko ) REFERENCES "user" ( uid ),
    add CONSTRAINT FK_55
        FOREIGN KEY ( snack ) REFERENCES snacks ( id );


alter table transaction
    add CONSTRAINT FK_65
        FOREIGN KEY ( "user" ) REFERENCES "user" ( uid ),
    add CONSTRAINT FK_68
        FOREIGN KEY ( snack ) REFERENCES local_snacks ( id );


alter table "user"
    add CONSTRAINT FK_34
        FOREIGN KEY ( unit_id ) REFERENCES unit ( uid );



alter table unit
    add CONSTRAINT FK_37
        FOREIGN KEY ( admin ) REFERENCES "user" ( uid ),
    add CONSTRAINT FK_40
        FOREIGN KEY ( snacko ) REFERENCES "user" ( uid );



