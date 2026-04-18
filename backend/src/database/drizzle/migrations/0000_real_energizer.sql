CREATE TABLE "perfume" (
	"perfume_id" serial PRIMARY KEY NOT NULL,
	"perfume_name" varchar(50) NOT NULL,
	"price" numeric(10, 2),
	"description" varchar(100),
	"status" smallint DEFAULT 1 NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp,
	"deleted_date" timestamp,
	"created_by" integer NOT NULL,
	"updated_by" integer,
	"deleted_by" integer
);
--> statement-breakpoint
CREATE TABLE "service" (
	"service_id" serial PRIMARY KEY NOT NULL,
	"service_name" varchar(100) NOT NULL,
	"duration" integer NOT NULL,
	"price" numeric(10, 2),
	"description" varchar(100),
	"status" smallint DEFAULT 1 NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp,
	"deleted_date" timestamp,
	"created_by" integer NOT NULL,
	"updated_by" integer,
	"deleted_by" integer
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"transactions_id" serial PRIMARY KEY NOT NULL,
	"transaction_date" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"status" smallint DEFAULT 1 NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp,
	"deleted_date" timestamp,
	"created_by" integer NOT NULL,
	"updated_by" integer,
	"deleted_by" integer
);
--> statement-breakpoint
CREATE TABLE "transactions_item" (
	"transactions_item_id" serial PRIMARY KEY NOT NULL,
	"transactions_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"perfume_id" integer,
	"status" smallint DEFAULT 1 NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp,
	"deleted_date" timestamp,
	"created_by" integer NOT NULL,
	"updated_by" integer,
	"deleted_by" integer
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone_number" varchar(25),
	"address" varchar(150),
	"wa_available" boolean,
	"email" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" integer NOT NULL,
	"status" smallint DEFAULT 1 NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp,
	"deleted_date" timestamp,
	"created_by" integer NOT NULL,
	"updated_by" integer,
	"deleted_by" integer,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "perfume" ADD CONSTRAINT "perfume_created_by_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "perfume" ADD CONSTRAINT "perfume_updated_by_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "perfume" ADD CONSTRAINT "perfume_deleted_by_user_user_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service" ADD CONSTRAINT "service_created_by_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service" ADD CONSTRAINT "service_updated_by_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service" ADD CONSTRAINT "service_deleted_by_user_user_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_created_by_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_updated_by_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_deleted_by_user_user_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_transactions_id_transactions_transactions_id_fk" FOREIGN KEY ("transactions_id") REFERENCES "public"."transactions"("transactions_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_service_id_service_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("service_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_perfume_id_perfume_perfume_id_fk" FOREIGN KEY ("perfume_id") REFERENCES "public"."perfume"("perfume_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_created_by_user_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_updated_by_user_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_deleted_by_user_user_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_perfume_created_by" ON "perfume" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "idx_perfume_updated_by" ON "perfume" USING btree ("updated_by");--> statement-breakpoint
CREATE INDEX "idx_perfume_deleted_by" ON "perfume" USING btree ("deleted_by");--> statement-breakpoint
CREATE INDEX "idx_service_created_by" ON "service" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "idx_service_updated_by" ON "service" USING btree ("updated_by");--> statement-breakpoint
CREATE INDEX "idx_service_deleted_by" ON "service" USING btree ("deleted_by");--> statement-breakpoint
CREATE INDEX "idx_transactions_user" ON "transactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_user_date" ON "transactions" USING btree ("user_id","transaction_date");--> statement-breakpoint
CREATE INDEX "idx_transactions_created_by" ON "transactions" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "idx_transactions_updated_by" ON "transactions" USING btree ("updated_by");--> statement-breakpoint
CREATE INDEX "idx_transactions_deleted_by" ON "transactions" USING btree ("deleted_by");--> statement-breakpoint
CREATE INDEX "idx_transactions_item_transactions" ON "transactions_item" USING btree ("transactions_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_item_service" ON "transactions_item" USING btree ("service_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_item_perfume" ON "transactions_item" USING btree ("perfume_id");--> statement-breakpoint
CREATE INDEX "idx_transactions_item_created_by" ON "transactions_item" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "idx_transactions_item_updated_by" ON "transactions_item" USING btree ("updated_by");--> statement-breakpoint
CREATE INDEX "idx_transactions_item_deleted_by" ON "transactions_item" USING btree ("deleted_by");--> statement-breakpoint
CREATE INDEX "idx_user_status" ON "user" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_user_created_by" ON "user" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "idx_user_updated_by" ON "user" USING btree ("updated_by");--> statement-breakpoint
CREATE INDEX "idx_user_deleted_by" ON "user" USING btree ("deleted_by");