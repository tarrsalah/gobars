package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func AddBarHundler(w http.ResponseWriter, r *http.Request) {
	var bar_name struct{ Name string }
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&bar_name)
	if err != nil {
		panic(err)
	}
	// TODO : generate an iD
	bar := Bar{Name: bar_name.Name, Id: "id"}
	AddBar(bar)
}

func ListBarsHundler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enc := json.NewEncoder(w)
	enc.Encode(ListBars())
}

func main() {
	http.HandleFunc("/bar", AddBarHundler)
	http.HandleFunc("/bars", ListBarsHundler)
	http.Handle("/", http.FileServer(http.Dir("public")))
	fmt.Println("listen and serve at http://localhost:8081 ...")
	http.ListenAndServe(":8081", nil)
}
