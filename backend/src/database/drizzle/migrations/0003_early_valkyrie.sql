ALTER TABLE "public"."customers" ALTER COLUMN "created_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "public"."laundry_services" ALTER COLUMN "created_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "public"."perfumes" ALTER COLUMN "created_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "public"."transactions" ALTER COLUMN "transaction_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "public"."users" ALTER COLUMN "created_date" SET DEFAULT now();