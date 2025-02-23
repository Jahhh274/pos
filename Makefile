start-infra:
	docker compose --env-file .env.docker -f infrastructure.docker-compose.yaml up -d

stop-infra:
	docker compose -f infrastructure.docker-compose.yaml down