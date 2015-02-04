package main

import (
	"encoding/json"
	"github.com/gohttp/logger"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"net/http"
)

const (
	BARS_FILE = "bars.db"
	SQL       = `
		create table bars (
			id INTEGER PRIMARY KEY,
			bar TEXT
		);
		`
)

var s = NewStore()

func main() {
	logger := logger.New()
	r := mux.NewRouter()

	fs := http.FileServer(http.Dir("./public/"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	r.Handle("/", logger(http.HandlerFunc(index))).Methods("GET")
	r.Handle("/bars", logger(http.HandlerFunc(getBars))).Methods("GET")
	r.Handle("/bars", logger(http.HandlerFunc(postBar))).Methods("POST")

	log.Println("Listening on http://localhost:3000 ...")
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./public/index.html")
}

func getBars(w http.ResponseWriter, r *http.Request) {
	response(w, s.GetAllBars(), http.StatusOK)
}

func postBar(w http.ResponseWriter, r *http.Request) {
	bar := new(Bar)

	if err := json.NewDecoder(r.Body).Decode(bar); err != nil {
		log.Printf("Error: %s\n", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	id, _ := s.InsertBar(*bar)
	bar.Id = id
	response(w, bar, http.StatusCreated)
}

func response(w http.ResponseWriter, v interface{}, code int) {
	var (
		b   []byte
		err error
	)

	if b, err = json.MarshalIndent(v, "", " "); err != nil {
		log.Printf("Error: %s\n", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(b)
}
