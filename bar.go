// business and data layer
package main

type BarRepository interface {
	GetAllBars() []Bar
	InsertBar(Bar)
}

type Bar struct {
	Id   int
	Name string `json: "name"`
}

type barRepo struct{}

func (b barRepo) GetAllBars() []Bar {
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

func (b barRepo) InsertBar(bars []Bar) {
	sqlDB := SetupDB()
	defer sqlDB.Close()
	for _, bar := range bars {
		if _, err := sqlDB.Exec("insert into bars(bar) values(?)", bar.Name); err != nil {
			panic(err)
		}
	}
}
