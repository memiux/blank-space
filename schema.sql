SELECT pid, pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname IS NOT NULL AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS "vaca";

CREATE DATABASE "vaca";

\c vaca;

CREATE TABLE "users" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "name" text,
		"is_active" boolean,
    PRIMARY KEY ("id")
);

CREATE TABLE "posts" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "title" text,
		"content" text,
    PRIMARY KEY ("id")
);

INSERT INTO "users" ( name, is_active ) VALUES ('root', true), ('admin', true), ('taylorswift', false);
INSERT INTO "posts" ( title, content ) VALUES ('foo', 'hello world'), ('my post', '...');
