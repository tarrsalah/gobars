package main

import (
	"database/sql"
	"os"

	_ "code.google.com/p/go-sqlite/go1/sqlite3"
)

const (
	BARS_FILE = "bars.db"
)

func BootstrpDB() {
	os.Remove("./bars.db")
	db := SetupDB()
	defer db.Close()
	if _, err := db.Exec(`
		create table bars (
			id INTEGER PRIMARY KEY,
			bar TEXT
		)
	`); err != nil {
		panic(err)
	}
}

func SetupDB() *sql.DB {
	var (
		err   error
		sqlDB *sql.DB
	)
	if sqlDB, err = sql.Open("sqlite3", BARS_FILE); err != nil {
		panic(err)
	}
	return sqlDB
}
