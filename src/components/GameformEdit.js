import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';

import { useParams } from 'react-router';
import axios from 'axios';

function GameformEdit() {

    let { id, name, publisher, genre, platform, started, finished, rating, notes } = useParams();

    // Pilkotaan päivämäärä osiin, jotta saadaan se Date-muotoon
    let startedTemp = started.split('.')
    let finishedTemp = finished.split('.')

    // Tilamuuttujat
    const [game, setValues] = useState(
        {
            id: id,
            name: name,
            // Kuvaa ei päivitetä
            image: [],
            publisher: publisher,
            genre: genre,
            platform: platform,
            started: new Date(startedTemp[2], startedTemp[1] - 1, startedTemp[0]),
            finished: new Date(finishedTemp[2], finishedTemp[1] - 1, finishedTemp[0]),
            rating: rating,
            notes: notes
        }
    )

    // Viesti, joka tulee submitia painettaessa
    const [message, setMessage] = useState('');

    const change = (e) => {
        setValues(
            {
                ...game,
                [e.target.name]: e.target.value
            }
        )
        setMessage('');
    }

    // Funktio joka toteuttaa muutokset tietokantaan
    const editGame = async (e) => {
        e.preventDefault();
        let id = game.id;
        let startDate = game.started.getDate() + '.' + (game.started.getMonth() + 1) + '.' + game.started.getFullYear();
        let endDate = game.finished.getDate() + '.' + (game.finished.getMonth() + 1) + '.' + game.finished.getFullYear();

        const formData = {
            name: game.name,
            publisher: game.publisher,
            genre: game.genre,
            platform: game.platform,
            started: startDate,
            finished: endDate,
            rating: game.rating,
            notes: game.notes
        }

        try {
            await axios.put('http://localhost:8080/game/edit/' + id, formData);
            setValues({
                name: '',
                image: [],
                publisher: '',
                genre: '',
                platform: '',
                started: new Date(),
                finished: new Date(),
                rating: '',
                notes: ''
            });
            setMessage('Peliä muokattiin');
        } catch (error) {
            setValues({
                name: '',
                image: [],
                publisher: '',
                genre: '',
                platform: '',
                started: new Date(),
                finished: new Date(),
                rating: '',
                notes: ''
            });
            setMessage('Muokkaus ei onnistunut');
        }
    }

    //Päivämuuttujat
    const changeStartdate = (e) => {
        setValues({
            ...game,
            started: e
        });

        setMessage('');
    };

    const changeEnddate = (e) => {
        setValues({
            ...game,
            finished: e
        });

        setMessage('');
    };

    return (
        <Paper sx={{
            width: { xs: '500px', sm: '500px', md: '700px', lg: '700px' }, padding: '10px',
            marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', marginBottom: '10px'
        }}>
            <Box
                component='form'
                sx={{ '& .MuiTextField-root': { marginBottom: 2 }, padding: 2, margin: 2 }}>
                <Typography variant='h5' sx={{ marginBottom: 2, textAlign: 'center' }}>Muokkaa peliä</Typography>
                <TextField label='Nimi' name='name' value={game.name}
                    onChange={(e) => change(e)} fullWidth />

                <TextField label='Julkaisija' name='publisher' value={game.publisher}
                    onChange={(e) => change(e)} fullWidth />

                <TextField label='Genre' name='genre' value={game.genre}
                    onChange={(e) => change(e)} fullWidth />

                <TextField label='Alusta' name='platform' value={game.platform}
                    onChange={(e) => change(e)} fullWidth />

                <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={fiLocale}>
                    <DatePicker
                        value={game.started} label='Aloitusaika'
                        //Käyttäjän syöttämä arvo laitetaan aloitusaika-muuttujaan
                        onChange={(e) => changeStartdate(e)}
                        //Renderöidään tulos textfieldiin
                        renderInput={(params) => <TextField {...params} required fullWidth />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={fiLocale}>
                    <DatePicker
                        value={game.finished} label='Lopetusaika'
                        //Käyttäjän syöttämä arvo laitetaan lopetusaika-muuttujaan
                        onChange={(e) => changeEnddate(e)}
                        //Renderöidään tulos textfieldiin
                        renderInput={(params) => <TextField {...params} required fullWidth />}
                    />
                </LocalizationProvider>

                <TextField label='Arvostelu' name='rating' value={game.rating}
                    onChange={(e) => change(e)} fullWidth>
                </TextField>

                <TextField label='Muistiinpanot' name='notes' multiline rows='3'
                    value={game.notes} onChange={(e) => change(e)} fullWidth />

                <Box sx={{ textAlign: 'center', marginTop: 1 }}>
                    <Button color='secondary' onClick={(e) => editGame(e)} variant='contained' sx={{ marginRight: 3 }} startIcon={<SaveIcon />}>Tallenna</Button>
                    <Button color='primary' href="/pelit" variant='contained' startIcon={<ArrowBackIcon />}>Takaisin</Button>
                </Box>
                <Typography sx={{ marginTop: 3 }}>{message}</Typography>
            </Box>

        </Paper>
    )
}

export default GameformEdit;