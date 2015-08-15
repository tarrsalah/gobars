package main

import (
	"database/sql"
	"encoding/json"
	_ "github.com/mattn/go-sqlite3"
	"github.com/nytimes/gziphandler"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
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

func (b *store) GetBarByID(i int64) (Bar, error) {
	var (
		id   int64
		name string
	)

	stmt, err := b.db.Prepare("SELECT * FROM bars WHERE id = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	err = stmt.QueryRow(i).Scan(&id, &name)
	if err != nil {
		panic(err)
		return Bar{}, err
	}

	return Bar{
		Id:   id,
		Name: name,
	}, nil
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
	mux := http.DefaultServeMux
	gzipbars := gziphandler.GzipHandler(http.HandlerFunc(bars))

	fs := http.FileServer(http.Dir("./public/"))
	mux.Handle("/bars", gzipbars)
	mux.Handle("/bars/", gzipbars)
	http.Handle("/public/", http.StripPrefix("/public/", fs))
	mux.Handle("/", http.HandlerFunc(index))
	log.Println("Listening on http://localhost:3000 ...")
	log.Fatal(http.ListenAndServe(":3000", mux))
}

func bars(w http.ResponseWriter, r *http.Request) {
	time.Sleep(250 * time.Millisecond)
	path := r.URL.Path
	log.Println(path)
	switch r.Method {
	case "GET":
		if len(path) > len("/bars/") { // GET  /bars/:bar
			getBar(w, r)
			return
		}
		getBars(w, r)

	case "POST":
		postBars(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}
	http.ServeFile(w, r, "./public/index.html")
}

// GET /bars
func getBars(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if path != "/bars" && path != "/bars/" {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}
	response(w, s.GetAllBars(), http.StatusOK)
}

// GET /bar/{id}
func getBar(w http.ResponseWriter, r *http.Request) {
	key := r.URL.Path[len("/bars/"):]
	id, err := strconv.ParseInt(key, 10, 64)
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	if bar, err := s.GetBarByID(id); err != nil {
		response(w, bar, http.StatusOK)
		return
	}
}

// POST /bars
func postBars(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if path != "/bars" && path != "/bars/" { // POST /bars || /bars/ 405
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
