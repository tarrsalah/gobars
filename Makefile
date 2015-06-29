all: listen

build: server client

build-server :
	go build

build-client:
	(cd ./public && npm install && npm run build)

dev:
	(cd ./public && npm run build)
	go run main.go

run: server
	./gobars
