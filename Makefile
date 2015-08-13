all: run

build: build-server build-client

build-server:
	go build

build-client:
	(cd ./public && npm install && npm run build)

dev-server:
	go run main.go

dev-client:
	(cd ./public && npm run dev)

lint-client:
	(cd ./public && npm run lint)
