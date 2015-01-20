package main

import (
	"database/sql"
	"github.com/gohttp/logger"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"github.com/tarrsalah/jsonds"
	"log"
	"net/http"
	"os"
)

const (
	BARS_FILE = "bars.db"
	SQL       = `
		create table bars (
			id INTEGER PRIMARY KEY,
			bar TEXT
		);`
)

var ctx *Context

type Context struct {
	DS
}

func NewContext(db *sql.DB) *Context {
	return &Context{
		DS: DS{
			db: db,
		},
	}
}

func main() {
	logger := logger.New()
	r := mux.NewRouter()

	fs := http.FileServer(http.Dir("./public/"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	r.Handle("/", logger(http.HandlerFunc(indexHandler))).
		Methods("GET")
	r.Handle("/bars", logger(http.HandlerFunc(getBarsHandler))).
		Methods("GET")
	r.Handle("/bars", logger(http.HandlerFunc(postBarHandler))).
		Methods("POST")

	log.Println("Listening on http://localhost:3000 ...")
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./public/index.html")
}

func getBarsHandler(w http.ResponseWriter, r *http.Request) {
	json(w, ctx.GetAllBars(), http.StatusOK)
}

func postBarHandler(w http.ResponseWriter, r *http.Request) {
	bar := new(Bar)

	if err := jsonds.NewDecoder(r.Body).Decode(bar); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	id, _ := ctx.InsertBar(*bar)
	bar.Id = id
	json(w, bar, http.StatusCreated)
}

func json(w http.ResponseWriter, v interface{}, code int) {
	var (
		b   []byte
		err error
	)

	if b, err = jsonds.Marshal(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(b)
}

func init() {
	var (
		db  *sql.DB
		err error
	)

	os.Remove("./bars.db")
	if db, err = sql.Open("sqlite3", BARS_FILE); err != nil {
		panic(err)
	}
	if _, err = db.Exec(SQL); err != nil {
		panic(err)
	}

	ctx = NewContext(db)
}
