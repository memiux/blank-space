.DEFAULT_GOAL := up

up:
	(docker compose up; docker compose down)

db-setup:
	@docker compose up --no-recreate --detach postgres
	cat schema.sql | docker compose exec -T postgres psql --echo-all

install:
	npm install

run:
	deno run -A db-export.js
