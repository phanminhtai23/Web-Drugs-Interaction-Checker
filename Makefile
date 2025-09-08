# Makefile for Drug Interaction App

# Development commands
.PHONY: dev-up dev-down dev-logs dev-shell-backend dev-shell-frontend

dev-up:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-shell-backend:
	docker-compose -f docker-compose.dev.yml exec backend sh

dev-shell-frontend:
	docker-compose -f docker-compose.dev.yml exec frontend sh

# Production commands
.PHONY: prod-up prod-down prod-logs prod-shell-backend prod-shell-frontend

prod-up:
	docker-compose up -d

prod-down:
	docker-compose down

prod-logs:
	docker-compose logs -f

prod-shell-backend:
	docker-compose exec backend sh

prod-shell-frontend:
	docker-compose exec frontend sh

# Database commands
.PHONY: db-import db-backup db-shell

db-import:
	docker-compose exec mongodb mongoimport --db Drug_interactions --collection drugs --file /data/import/Drug_interactions.drugs.json
	docker-compose exec mongodb mongoimport --db Drug_interactions --collection drug_interaction --file /data/import/Drug_interactions.drug_interaction.json
	docker-compose exec mongodb mongoimport --db Drug_interactions --collection client --file /data/import/Drug_interactions.client.json

db-backup:
	docker-compose exec mongodb mongodump --db Drug_interactions --out /data/backup

db-shell:
	docker-compose exec mongodb mongosh Drug_interactions

# Utility commands
.PHONY: clean build-all restart-all

clean:
	docker system prune -f
	docker volume prune -f

build-all:
	docker-compose build --no-cache

restart-all:
	docker-compose down
	docker-compose up -d

# Install dependencies
.PHONY: install-backend install-frontend

install-backend:
	cd Backend && npm install

install-frontend:
	cd frontend && npm install
