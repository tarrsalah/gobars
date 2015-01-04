all: client server

server :
	go build

client:
	(cd ./public && bower install)

run: server
	./gobars
