package main

import (
	"database/sql"
	"github.com/bmizerany/pat"
	"github.com/gohttp/logger"
	_ "github.com/mattn/go-sqlite3"
	"github.com/tarrsalah/jsonds"
	"log"
	"net/http"
	"os"
)

var (
	ctx *Context
)

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

const (
	BARS_FILE = "bars.db"
	SQL       = `
		create table bars (
			id INTEGER PRIMARY KEY,
			bar TEXT
		);`
)

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
	pat := pat.New()

	fs := http.FileServer(http.Dir("./public/"))

	http.Handle("/public/", http.StripPrefix("/public/", fs))
	pat.Get("/", logger(http.HandlerFunc(indexHandler)))
	pat.Get("/bars", logger(http.HandlerFunc(getBarsHandler)))
	pat.Post("/bars", logger(http.HandlerFunc(postBarHandler)))

	log.Println("Listening on http://localhost:3000 ...")
	http.Handle("/", pat)
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func getBarsHandler(w http.ResponseWriter, r *http.Request) {
	replyJsonDs(w, ctx.GetAllBars(), http.StatusOK)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./public/index.html")
}
func postBarHandler(w http.ResponseWriter, r *http.Request) {
	bar := Bar{}
	if err := jsonds.NewDecoder(r.Body).Decode(&bar); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	id, _ := ctx.InsertBar(bar)
	bar.Id = id
	replyJsonDs(w, bar, http.StatusOK)
}

func replyJsonDs(w http.ResponseWriter, v interface{}, code int) {
	var (
		b   []byte
		err error
	)
	w.Header().Set("Content-Type", "application/json")
	if b, err = jsonds.Marshal(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		w.WriteHeader(http.StatusOK)
		w.Write(b)
	}
}
