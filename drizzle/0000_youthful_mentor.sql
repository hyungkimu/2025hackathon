CREATE TABLE IF NOT EXISTS "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "diary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"senior_id" uuid NOT NULL,
	"title" text,
	"image_url" text,
	"content": text,
	"risk" integer,
	"created_at" date DEFAULT now(),
	CONSTRAINT "diary_senior_id_created_at_unique" UNIQUE("senior_id","created_at")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "diary_message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"diary_id" uuid NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"emotion" text,
	"risk" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "senior" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"senior_id" text NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"guardian_phone" text NOT NULL,
	"address" text NOT NULL,
	CONSTRAINT "senior_senior_id_unique" UNIQUE("senior_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "diary" ADD CONSTRAINT "diary_senior_id_senior_id_fk" FOREIGN KEY ("senior_id") REFERENCES "public"."senior"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "diary_message" ADD CONSTRAINT "diary_message_diary_id_diary_id_fk" FOREIGN KEY ("diary_id") REFERENCES "public"."diary"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "senior" ADD CONSTRAINT "senior_admin_id_admin_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
