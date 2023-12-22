.PHONY: up down migrate

up:
	docker-compose up -d --build

down:
	docker-compose down

migrate: 
	docker-compose run api yarn db:migrate
