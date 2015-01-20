package main

import (
	"database/sql"
	"os"
)

type Bar struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

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

func (b *store) GetAllBars() []Bar {
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
	return bars
}

func (b *store) InsertBar(bar Bar) (int64, error) {

	if result, err := b.db.Exec("insert into bars(bar) values(?)", bar.Name); err != nil {
		panic(err)
	} else {
		return result.LastInsertId()
	}
}
