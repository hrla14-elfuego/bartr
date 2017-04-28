CREATE TABLE "Users" (
	"ID" serial NOT NULL UNIQUE,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"Name" VARCHAR(255) NOT NULL,
	"Location" VARCHAR(255) NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Services" (
	"ID" serial NOT NULL UNIQUE,
	"Type" VARCHAR(255) NOT NULL UNIQUE,
	CONSTRAINT Services_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "User_Service_Mapping" (
	"ID" serial NOT NULL UNIQUE,
	"User" integer NOT NULL,
	"Service" integer NOT NULL,
	"expectation" TEXT NOT NULL,
	CONSTRAINT User_Service_Mapping_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Engagements" (
	"ID" serial NOT NULL UNIQUE,
	"customer" integer NOT NULL,
	"provider" integer NOT NULL,
	"complete" BOOLEAN NOT NULL,
	CONSTRAINT Engagements_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Messages" (
	"ID" serial NOT NULL UNIQUE,
	"engagement" integer NOT NULL,
	"from" integer NOT NULL,
	"to" integer NOT NULL,
	"message" VARCHAR(255) NOT NULL,
	CONSTRAINT Messages_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Service Review" (
	"ID" serial NOT NULL UNIQUE,
	"user" integer NOT NULL,
	"service" integer NOT NULL,
	"score" integer NOT NULL,
	"text" TEXT NOT NULL,
	CONSTRAINT Service Review_pk PRIMARY KEY ("ID")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "User_Service_Mapping" ADD CONSTRAINT "User_Service_Mapping_fk0" FOREIGN KEY ("User") REFERENCES "Users"("ID");
ALTER TABLE "User_Service_Mapping" ADD CONSTRAINT "User_Service_Mapping_fk1" FOREIGN KEY ("Service") REFERENCES "Services"("ID");

ALTER TABLE "Engagements" ADD CONSTRAINT "Engagements_fk0" FOREIGN KEY ("customer") REFERENCES "Users"("ID");
ALTER TABLE "Engagements" ADD CONSTRAINT "Engagements_fk1" FOREIGN KEY ("provider") REFERENCES "Users"("ID");

ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk0" FOREIGN KEY ("engagement") REFERENCES "Engagements"("ID");
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk1" FOREIGN KEY ("from") REFERENCES "Users"("ID");
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk2" FOREIGN KEY ("to") REFERENCES "Users"("ID");

ALTER TABLE "Service Review" ADD CONSTRAINT "Service Review_fk0" FOREIGN KEY ("user") REFERENCES "Users"("ID");
ALTER TABLE "Service Review" ADD CONSTRAINT "Service Review_fk1" FOREIGN KEY ("service") REFERENCES "User_Service_Mapping"("ID");

