ruff:
	@ruff check --fix .
	@ruff format .


app:
	@docker compose up app --build --force-recreate;


shell:
	@docker compose up app --build -d --force-recreate;
	@docker compose exec -it app bash;