ALTER TABLE "data"."customers" ALTER COLUMN "created_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "data"."laundry_services" ALTER COLUMN "created_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "data"."perfumes" ALTER COLUMN "created_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "data"."transactions" ALTER COLUMN "transaction_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "data"."users" ALTER COLUMN "created_date" SET DEFAULT now();