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
)

type Context struct {
	DS
}

func bars(bars []Bar) map[string][]Bar {
	return map[string][]Bar{
		"bars": bars,
	}
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
		b := Bar{}
		if err := dec.Decode(&b); err != nil {
			log.Fatal(err)
			return
		}
		ctx.InsertBar([]Bar{b})
		log.Println(b)
		response.Created(w, b)
	})
}

func ListBarsHundler(ctx *Context) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		response.OK(w, bars(ctx.GetAllBars()))
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
	if _, err = db.Exec(`
		create table bars (
			id INTEGER PRIMARY KEY,
			bar TEXT
		);

               INSERT INTO bars(bar) VALUES ("one bar");
               INSERT INTO bars(bar) VALUES ("second bar");
               INSERT INTO bars(bar) VALUES ("third bar");
 	`); err != nil {
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

	app.Listen(":3000")
}
