package main

import (
	"database/sql"
	"encoding/json"
	"github.com/gohttp/app"
	"github.com/gohttp/logger"
	"github.com/gohttp/response"
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
		);`
)

type Context struct {
	DS
}

func WrapBars(bars []Bar) map[string][]Bar {
	return map[string][]Bar{
		"bars": bars,
	}
}

func WrapBar(bar Bar) map[string]Bar {
	return map[string]Bar{
		"bar": bar,
	}
}

func UnWrapBar(w map[string]Bar) Bar {
	return w["bar"]
}

func UnWrapBars(w map[string][]Bar) []Bar {
	return w["bars"]
}

func NewContext(db *sql.DB) *Context {
	return &Context{
		DS: DS{
			db: db,
		},
	}
}
func AddBarHundler(ctx *Context) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		dec := json.NewDecoder(r.Body)
		wrapped := WrapBar(Bar{})
		if err := dec.Decode(&wrapped); err != nil {
			log.Fatal(err)
			return
		}
		b := wrapped["bar"]
		id, _ := ctx.InsertBar(b)
		response.Created(w, WrapBar(Bar{Id: id, Name: b.Name}))
	})
}

func ListBarsHundler(ctx *Context) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		response.OK(w, WrapBars(ctx.GetAllBars()))
	})
}

func main() {
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

	ctx := NewContext(db)
	app := app.New()
	app.Use(logger.New())

	fs := http.FileServer(http.Dir("./public/"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	app.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	})

	app.Get("/bars", ListBarsHundler(ctx))
	app.Post("/bars", AddBarHundler(ctx))
	log.Println("Listening on http://localhost:3000 ...")
	app.Listen(":3000")
}
