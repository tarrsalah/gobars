package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "code.google.com/p/go-sqlite/go1/sqlite3"
)

var (
	barDB barRepo = barRepo{}
)

func AddBarHundler(w http.ResponseWriter, r *http.Request) {
	dec := json.NewDecoder(r.Body)
	b := Bar{}
	if err := dec.Decode(&b); err != nil {
		log.Fatal(err)
		return
	}
	barDB.InsertBar([]Bar{b})
}

func ListBarsHundler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enc := json.NewEncoder(w)
	bars := barDB.GetAllBars()
	enc.Encode(bars)
}

func main() {
	BootstrpDB()
	http.HandleFunc("/bar", AddBarHundler)
	http.HandleFunc("/bars", ListBarsHundler)
	http.Handle("/", http.FileServer(http.Dir("static/dist")))
	fmt.Println("listen and serve at http://localhost:8081 ...")
	http.ListenAndServe(":8081", nil)
}
