ALTER TABLE "data"."services" RENAME TO "laundry_services";--> statement-breakpoint
ALTER TABLE "data"."laundry_services" RENAME COLUMN "services_id" TO "laundry_services_id";--> statement-breakpoint
ALTER TABLE "data"."transactions" DROP CONSTRAINT "transactions_service_id_services_services_id_fk";
--> statement-breakpoint
ALTER TABLE "data"."transactions" ADD CONSTRAINT "transactions_service_id_laundry_services_laundry_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "data"."laundry_services"("laundry_services_id") ON DELETE no action ON UPDATE no action;