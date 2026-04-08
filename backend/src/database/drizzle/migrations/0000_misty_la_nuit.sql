-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

-- CREATE SCHEMA "public";
--> statement-breakpoint
CREATE TABLE "public"."perfumes" (
	"perfumes_id" serial PRIMARY KEY NOT NULL,
	"perfume_name" varchar(50) NOT NULL,
	"price" numeric,
	"description" varchar(100),
	"status" smallint
);
--> statement-breakpoint
CREATE TABLE "public"."customers" (
	"customers_id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar(100) NOT NULL,
	"number_of_transaction" integer,
	"phone_number" varchar(25),
	"wa_available" boolean,
	"last_transaction" date,
	"address" varchar(150)
);
--> statement-breakpoint
CREATE TABLE "public"."services" (
	"services_id" serial PRIMARY KEY NOT NULL,
	"service_name" varchar(100) NOT NULL,
	"price" numeric,
	"status" smallint
);
--> statement-breakpoint
CREATE TABLE "public"."users" (
	"users_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "public"."public.users_id" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(100) NOT NULL,
	"status" smallint,
	"email" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "public"."transactions" (
	"transactions_id" serial PRIMARY KEY NOT NULL,
	"transaction_date" date,
	"customer_id" integer,
	"service_id" integer,
	"perfume_id" integer,
	"total_price" numeric
);
--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_customer_id_customers_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customers_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_service_id_services_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("services_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_perfume_id_perfumes_perfumes_id_fk" FOREIGN KEY ("perfume_id") REFERENCES "public"."perfumes"("perfumes_id") ON DELETE no action ON UPDATE no action;
