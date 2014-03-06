package main

import (
	"encoding/json"
	"os"
)

const (
	BARS_FILE = "bars.db"
)

//TODO: mongodb database instead of text files
type Bar struct {
	Id   string
	Name string
}

func ListBars() []Bar {
	var bars []Bar
	bars_file, _ := os.OpenFile(BARS_FILE, os.O_RDONLY|os.O_CREATE, 0666)
	defer bars_file.Close()
	dec := json.NewDecoder(bars_file)
	err := dec.Decode(&bars)
	if err != nil {
		return []Bar{}
	}
	return bars
}

func AddBar(bar Bar) error {
	bars := ListBars()
	bars_file, err := os.OpenFile(BARS_FILE, os.O_RDWR, 0666)
	if err != nil {
		return err
	}
	defer bars_file.Close()
	enc := json.NewEncoder(bars_file)
	err = enc.Encode(append(bars, bar))
	return err
}
