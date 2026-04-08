ALTER TABLE "public"."transactions" RENAME COLUMN "service_id" TO "laundry_service_id";--> statement-breakpoint
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_service_id_laundry_services_laundry_services_id_fk";
--> statement-breakpoint
ALTER TABLE "public"."customers" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "public"."customers" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "public"."customers" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "public"."customers" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "public"."perfumes" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "public"."perfumes" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "public"."perfumes" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "public"."perfumes" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "public"."laundry_services" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "public"."laundry_services" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "public"."laundry_services" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "public"."laundry_services" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "public"."users" ADD COLUMN "created_date" date;--> statement-breakpoint
ALTER TABLE "public"."users" ADD COLUMN "updated_date" date;--> statement-breakpoint
ALTER TABLE "public"."users" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "public"."users" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_laundry_service_id_laundry_services_laundry_services_id_fk" FOREIGN KEY ("laundry_service_id") REFERENCES "public"."laundry_services"("laundry_services_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_service_id_services_services_id_fk" FOREIGN KEY ("laundry_service_id") REFERENCES "public"."laundry_services"("laundry_services_id") ON DELETE no action ON UPDATE no action;