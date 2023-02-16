const express = require('express');
const app = express();

var helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());
app.use(express.urlencoded({ limit: '5mb', extended: true }));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('games.db');

app.listen(8080, () => {
	console.log('Node toimii localhost:8080');
});

app.get('/', (req, res, next) => {
	return res.status(200).json({ error: false, message: 'Toimii' });
});

// Usean rivin haku
app.get('/game/all', (req, res, next) => {

	db.all('SELECT * FROM game', (error, results) => {
		if (error) throw error;
		return res.status(200).json(results);
	})

})

// Yhden haku
app.get('/game/one/:id', (req, res, next) => {
	let id = req.params.id; // Pyynnössä tullut parametri

	db.get('SELECT * FROM game where id=?', [id], (error, result) => {
		if (error) throw error;

		// Tyhjän objektin palautus, jos yhtään hakutulosta ei ole
		if (typeof (result) === 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	})
})

// Multer kuvaa varten
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './images'); // Mihin kansioon ladataan
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);  // Millä tiedostonimellä
	}
});

const upload = multer({ storage: storage })

// Tietokantaan lisääminen
app.post('/game/add', upload.single('image'), (req, res, next) => {
	let game = req.body;
	let imageName = null;
	// Jos tulee kuvatiedosto, tietokantaan tulee sama nimi
	if (req.file) {
		imageName = req.file.originalname;
	}

	db.run('insert into game (id, image, name, publisher, genre, platform, started, finished, rating, notes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[game.id, imageName, game.name, game.publisher, game.genre, game.platform, game.started, game.finished, game.rating, game.notes], (error, result) => {
			if (error) throw error;

			return res.status(200).json({ count: 1 });
		});
})

// Kuvan näyttäminen 
app.get('/download/:name', (req, res, next) => {
	var file = './images/' + req.params.name;
	res.download(file);
});

app.get('/game/delete/:id', (req, res, next) => {
	let id = req.params.id;

	// Kuvaa ei poisteta kannasta, vaan jää kansioon
	db.run('DELETE FROM game WHERE id = ?', [id], function (error, result) {

		if (error) throw error;
		return res.status(200).json({ count: this.changes });
	})
})


// Muutos kantaan
app.put('/game/edit/:id', (req, res, next) => {
	let id = req.params.id;
	let game = req.body;
	db.run('UPDATE game SET name = ?, publisher = ?, genre = ?, platform = ?, started = ?, finished = ?, rating = ?, notes = ? WHERE id = ?',
		[game.name, game.publisher, game.genre, game.platform, game.started, game.finished, game.rating, game.notes, id], function (error, result) {
			if (error) throw error;

			return res.status(200).json({ count: this.changes });
		})
})

app.get('*', (req, res, next) => {
	return res.status(404).json({ error: true, message: 'Ei pyydettyä palvelua' });
})
