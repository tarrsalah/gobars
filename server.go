package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"net/http"
	"os"
)

const (
	BARS_FILE = "bars.db"
)

type Context struct {
	repository barRepo
}

func NewContext(db *sql.DB) *Context {
	return &Context{
		repository: barRepo{
			db: db,
		},
	}
}
func main() {
	var db *sql.DB
	var err error
	os.Remove("./bars.db")
	if db, err = sql.Open("sqlite3", BARS_FILE); err != nil {
		panic(err)
	}
	if _, err = db.Exec(`
		create table bars (
			id INTEGER PRIMARY KEY,
			bar TEXT
		)
	`); err != nil {
		panic(err)
	}

	ctx := NewContext(db)
	http.Handle("/bar", AddBarHundler(ctx))
	http.Handle("/bars", ListBarsHundler(ctx))
	http.Handle("/", http.FileServer(http.Dir("static")))
	fmt.Println("listen and serve at http://localhost:8081 ...")
	http.ListenAndServe(":8081", nil)
}

func AddBarHundler(ctx *Context) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		dec := json.NewDecoder(r.Body)
		b := Bar{}
		if err := dec.Decode(&b); err != nil {
			log.Fatal(err)
			return
		}
		ctx.repository.InsertBar([]Bar{b})
	})
}

func ListBarsHundler(ctx *Context) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		enc := json.NewEncoder(w)
		bars := ctx.repository.GetAllBars()
		enc.Encode(bars)
	})
}
