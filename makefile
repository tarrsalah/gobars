all: client server

server :
	go build

client:
	(cd ./public && bower install)

listen: server
	./gobars
