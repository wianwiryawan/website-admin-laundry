ALTER TABLE "public"."services" RENAME TO "laundry_services";--> statement-breakpoint
ALTER TABLE "public"."laundry_services" RENAME COLUMN "services_id" TO "laundry_services_id";--> statement-breakpoint
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_service_id_services_services_id_fk";
--> statement-breakpoint
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_service_id_laundry_services_laundry_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."laundry_services"("laundry_services_id") ON DELETE no action ON UPDATE no action;