// business and data layer
package main

import (
	"database/sql"
)

type BarRepository interface {
	GetAllBars() []Bar
	InsertBar(Bar)
}

type Bar struct {
	Id   int
	Name string `json: "name"`
}

type barRepo struct {
	db *sql.DB
}

func (b barRepo) GetAllBars() []Bar {
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

func (b barRepo) InsertBar(bars []Bar) {

	for _, bar := range bars {
		if _, err := b.db.Exec("insert into bars(bar) values(?)", bar.Name); err != nil {
			panic(err)
		}
	}
}
