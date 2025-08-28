ruff:
	@ruff check --fix .
	@ruff format .


app:
	@docker compose up app --build --force-recreate;


shell:
	@docker compose up app --build -d --force-recreate;
	@docker compose exec -it app bash;


backend:
	@docker compose up backend --build --force-recreate;


frontend:
	@cd web-app/frontend && npm run dev;