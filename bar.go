// business and data layer
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
	var (
		db  *sql.DB
		err error
	)
	os.Remove("./bars.db")
	if db, err = sql.Open("sqlite3", "./bars.db"); err != nil {
		panic(err)
	}
	defer db.Close()
	if _, err = db.Exec(`
		create table bars (
			id INTEGER PRIMARY KEY,
			bar TEXT
		)
	`); err != nil {
		panic(err)
	}
	b := barRepositorySql{}
	b.InsertBar([]Bar{
		Bar{Name: "tarrsalah"},
		Bar{Name: "Safa"},
	})

}

//
// Get one *sql.DB instance by goroutine
// You better close it !
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

type BarRepository interface {
	GetAllBars() []Bar
	InsertBar(Bar)
}

type Bar struct {
	Id   int
	Name string `json: "name"`
}

type barRepositorySql struct{}

func (b barRepositorySql) GetAllBars() []Bar {
	var (
		id   int
		name string
	)
	bars := []Bar{}
	sqlDB := SetupDB()
	defer sqlDB.Close()

	rows, err := sqlDB.Query("select * from bars")
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
	return bars
}

func (b barRepositorySql) InsertBar(bars []Bar) {
	sqlDB := SetupDB()
	defer sqlDB.Close()
	for _, bar := range bars {
		if _, err := sqlDB.Exec("insert into bars(bar) values(?)", bar.Name); err != nil {
			panic(err)
		}
	}
}

// func main() {
// 	BootstrpDB()
// 	b := barRepositorySql{}
// 	b.InsertBar([]Bar{
// 		Bar{Name: "tarrsalah"},
// 		Bar{Name: "safia"},
// 		Bar{Name: "imen"},
// 		Bar{Name: "anoir"},
// 	})
// 	for _, v := range b.GetAllBars() {
// 		fmt.Println(v)
// 	}
// }
