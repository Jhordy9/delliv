.PHONY: up down migrate seed

up:
	docker-compose up -d --build

down:
	docker-compose down

migrate: 
	docker-compose run api yarn db:migrate

seed:
	docker-compose run api yarn db:seed
