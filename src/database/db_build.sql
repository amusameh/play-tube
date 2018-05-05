
BEGIN;

DROP TABLE IF EXISTS "users";

DROP TABLE IF EXISTS "videos";

DROP TABLE IF EXISTS "play_lists";

DROP TABLE IF EXISTS "video_play_lists";

DROP TABLE IF EXISTS "comments";

DROP TABLE IF EXISTS "subscribe";



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"fname" varchar NOT NULL,
	"lname" varchar NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"country" varchar NOT NULL,
	"sex" varchar NOT NULL,
	"rule" varchar NOT NULL DEFAULT 'user',
	"bio" TEXT(300),
	"facebook" varchar UNIQUE,
	"twitter" varchar UNIQUE,
	"cover" varchar DEFAULT '/images/cover.jpg',
	"avatar" varchar DEFAULT '/images/avatar.jpg',
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "videos" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"link" varchar NOT NULL UNIQUE,
	"description" TEXT(600) NOT NULL,
	"user_id" int NOT NULL,
	"source" varchar,
	"poster" varchar,
	"deleted" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	"deleted_at" TIMESTAMP NOT NULL,
	"like" int NOT NULL,
	"dislike" int NOT NULL,
	CONSTRAINT videos_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "play_lists" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"user_id" int NOT NULL,
	"description" varchar NOT NULL,
	"private" BOOLEAN NOT NULL DEFAULT 'false',
	"updated_at" TIMESTAMP NOT NULL,
	"deleted_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT play_lists_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "video_play_lists" (
	"id" serial NOT NULL,
	"video_id" int NOT NULL,
	"play_list_id" int NOT NULL,
	CONSTRAINT video_play_lists_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"video_id" int NOT NULL,
	"content" TEXT(600) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	"deleted_at" TIMESTAMP NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT comments_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subscribe" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"channel_id" int NOT NULL,
	CONSTRAINT subscribe_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "videos" ADD CONSTRAINT "videos_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "play_lists" ADD CONSTRAINT "play_lists_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "video_play_lists" ADD CONSTRAINT "video_play_lists_fk0" FOREIGN KEY ("video_id") REFERENCES "videos"("id");
ALTER TABLE "video_play_lists" ADD CONSTRAINT "video_play_lists_fk1" FOREIGN KEY ("play_list_id") REFERENCES "play_lists"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("video_id") REFERENCES "videos"("id");

ALTER TABLE "subscribe" ADD CONSTRAINT "subscribe_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "subscribe" ADD CONSTRAINT "subscribe_fk1" FOREIGN KEY ("channel_id") REFERENCES "users"("id");

COMMIT;
