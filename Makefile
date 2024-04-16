build:
	docker-compose build && docker-compose up --no-start
start:
	docker-compose up --no-start --force-recreate && docker-compose start
stop:
	docker-compose stop
bash:
	docker exec -u kristofer -it clinimetrics-webserver bash

