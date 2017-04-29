CREATE TABLE "Users" (
	"id" serial NOT NULL UNIQUE,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"address" VARCHAR(255) NOT NULL,
	"serviceId" integer NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Services" (
	"id" serial NOT NULL UNIQUE,
	"type" VARCHAR(255) NOT NULL UNIQUE,
	CONSTRAINT Services_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Engagements" (
	"id" serial NOT NULL UNIQUE,
	"customerId" integer NOT NULL,
	"providerId" integer NOT NULL,
	"complete" BOOLEAN NOT NULL,
	CONSTRAINT Engagements_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Messages" (
	"id" serial NOT NULL UNIQUE,
	"engagementId" integer NOT NULL,
	"fromId" integer NOT NULL,
	"toId" integer NOT NULL,
	"message" TEXT NOT NULL,
	CONSTRAINT Messages_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Service Review" (
	"id" serial NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	"engagementId" integer NOT NULL,
	"score" integer NOT NULL,
	"review" TEXT NOT NULL,
	CONSTRAINT Service Review_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("serviceId") REFERENCES "Services"("id");


ALTER TABLE "Engagements" ADD CONSTRAINT "Engagements_fk0" FOREIGN KEY ("customerId") REFERENCES "Users"("id");
ALTER TABLE "Engagements" ADD CONSTRAINT "Engagements_fk1" FOREIGN KEY ("providerId") REFERENCES "Users"("id");

ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk0" FOREIGN KEY ("engagementId") REFERENCES "Engagements"("id");
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk1" FOREIGN KEY ("fromId") REFERENCES "Users"("id");
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk2" FOREIGN KEY ("toId") REFERENCES "Users"("id");

ALTER TABLE "Service Review" ADD CONSTRAINT "Service Review_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id");
ALTER TABLE "Service Review" ADD CONSTRAINT "Service Review_fk1" FOREIGN KEY ("engagementId") REFERENCES "Engagements"("id");
