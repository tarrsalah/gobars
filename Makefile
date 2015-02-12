all: listen

build: server client

server :
	go build

client:
	(cd ./public && bower install)

listen: server
	./gobars
