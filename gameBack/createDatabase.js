const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('games.db');

db.serialize( () => {

	let sql = "CREATE TABLE game (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "image text," +
			  "name text NOT NULL, " +
			  "publisher text NOT NULL, " +
			  "genre text NOT NULL, " +
			  "platform text NOT NULL, " +
			  "started date NOT NULL, " +
			  "finished date NOT NULL, " +
			  "rating text NOT NULL, " +
			  "notes text )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	}) 

	sql = "INSERT INTO `game` (`id`, `image`, `name`, `publisher`, `genre`, `platform`, `started`, `finished`, `rating`, `notes`) "+
	" VALUES (1, 'ffxiv.png', 'Final Fantasy XIV', 'Square Enix', 'MMORPG', 'Playstation 4', '1.5.2020', '6.11.2022', '5', 'Lempipelini. Tätä jaksaa pelata joka päivä.')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `game` (`id`, `image`, `name`, `publisher`, `genre`, `platform`, `started`, `finished`, `rating`, `notes`) "+
	" VALUES (2, 'yakuza0.png', 'Yakuza 0', 'Sega', 'Action, Adventure', 'Playstation 4', '1.9.2019', '31.10.2019','5', 'Aivan mahtava. Koukutti minut Yakuza-peleihin.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `game` (`id`, `image`, `name`, `publisher`, `genre`, `platform`, `started`, `finished`, `rating`, `notes`) "+
	" VALUES (3, 'acorigins.jpg', 'AC Origins', 'Ubisoft', 'Action, RPG', 'Playstation 4', '15.1.2022', '28.4.2022', '4.5', 'Hyvä juoni ja onnistunut taistelumekaniikka.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `game` (`id`, `image`, `name`, `publisher`, `genre`, `platform`, `started`, `finished`, `rating`, `notes`) "+
	" VALUES (4, 'persona5.jpg', 'Persona 5', 'Atlus', 'RPG', 'Playstation 4', '10.11.2019', '22.4.2020', '4.5', 'Erinomainen peli. Olisi kuitenkin voinut olla hieman lyhyempi.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `game` (`id`, `image`, `name`, `publisher`, `genre`, `platform`, `started`, `finished`, `rating`, `notes`) "+
	" VALUES (5, 'stardewvalley.jpg', 'Stardew Valley', 'ConcernedApe', 'Simulation, RPG', 'PC', '5.9.2020', '6.11.2022', '5', 'Rentouttava, mutta silti mielenkiintoinen peli.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `game` (`id`, `image`, `name`, `publisher`, `genre`, `platform`, `started`, `finished`, `rating`, `notes`) "+
	" VALUES (6, 'kingdomhearts.jpg', 'Kingdom Hearts', 'Square Enix', 'Action, RPG', 'PS4', '11.12.2017', '23.2.2018', '5', 'Klassikko! Tämä pitäisi pelata joskus uudestaan.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	db.each("SELECT id, name FROM game", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.name);
	})

	db.close();
})
