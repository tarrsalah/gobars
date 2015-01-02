package main

import (
	"database/sql"
)

type Bar struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type DS struct {
	db *sql.DB
}

func (b DS) GetAllBars() []Bar {
	var (
		id   int
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

func (b DS) InsertBar(bars []Bar) {
	for _, bar := range bars {
		if _, err := b.db.Exec("insert into bars(bar) values(?)", bar.Name); err != nil {
			panic(err)
		}
	}
}
