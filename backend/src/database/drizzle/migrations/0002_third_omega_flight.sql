ALTER TABLE "data"."transactions" RENAME COLUMN "service_id" TO "laundry_service_id";--> statement-breakpoint
ALTER TABLE "data"."transactions" DROP CONSTRAINT "transactions_service_id_laundry_services_laundry_services_id_fk";
--> statement-breakpoint
ALTER TABLE "data"."customers" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "data"."customers" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "data"."customers" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "data"."customers" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "data"."perfumes" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "data"."perfumes" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "data"."perfumes" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "data"."perfumes" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "data"."laundry_services" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "data"."laundry_services" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "data"."laundry_services" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "data"."laundry_services" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "data"."transactions" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "data"."transactions" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "data"."transactions" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "data"."users" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "data"."users" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "data"."users" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "data"."users" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "data"."transactions" ADD CONSTRAINT "transactions_laundry_service_id_laundry_services_laundry_services_id_fk" FOREIGN KEY ("laundry_service_id") REFERENCES "data"."laundry_services"("laundry_services_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data"."transactions" ADD CONSTRAINT "transactions_service_id_services_services_id_fk" FOREIGN KEY ("laundry_service_id") REFERENCES "data"."laundry_services"("laundry_services_id") ON DELETE no action ON UPDATE no action;