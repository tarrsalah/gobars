package main

import (
	"database/sql"
	"encoding/json"
	"github.com/gohttp/logger"
	_ "github.com/mattn/go-sqlite3"
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
		);
		`
)

type Bar struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

type Bars []Bar

type store struct {
	db *sql.DB
}

func NewStore() *store {
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

	return &store{db}
}

func (b *store) GetAllBars() Bars {
	var (
		id   int64
		name string
	)
	bars := []Bar{}

	rows, err := b.db.Query("select * from bars")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&id, &name); err != nil {
			panic(err)
		}
		bars = append(bars, Bar{id, name})
	}
	return Bars(bars)
}

func (b *store) InsertBar(bar Bar) (int64, error) {

	if result, err := b.db.Exec("insert into bars(bar) values(?)", bar.Name); err != nil {
		panic(err)
	} else {
		return result.LastInsertId()
	}
}

var s = NewStore()

func main() {
	logger := logger.New()
	mux := http.DefaultServeMux

	fs := http.FileServer(http.Dir("./public/"))

	mux.Handle("/bars", logger(http.HandlerFunc(bars)))
	mux.Handle("/", logger(http.HandlerFunc(index)))
	http.Handle("/public/", http.StripPrefix("/public/", fs))
	log.Println("Listening on http://localhost:3000 ...")
	log.Fatal(http.ListenAndServe(":3000", mux))
}

func index(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}
	http.ServeFile(w, r, "./public/index.html")
}

func bars(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	switch r.Method {
	case "GET":
		if path != "/bars" && path != "/bars/" { // 404
			http.Error(w, "Not Found", http.StatusNotFound)
			return
		}
		response(w, s.GetAllBars(), http.StatusOK)

	case "POST":
		if path != "/bars" && path != "/bars/" { // bad request
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}

		bar := new(Bar)
		if err := json.NewDecoder(r.Body).Decode(bar); err != nil {
			log.Printf("Error: %s\n", err.Error())
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		id, _ := s.InsertBar(*bar)
		bar.Id = id
		response(w, bar, http.StatusCreated)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
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
