import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import AttachmentIcon from '@mui/icons-material/Attachment';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';

import axios from 'axios';

function Gameform() {
    
    const [game, setValues] = useState(
        {
            id: '',
            name: '',
            image: [],
            publisher: '',
            genre: '',
            platform: '',
            started: new Date(),
            finished: new Date(),
            rating: '',
            notes: ''
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

    // Lisätään lomakkeen tiedot tietokantaan
    const addGame = async (e) => {
        let startDate = game.started.getDate() + '.' + (game.started.getMonth() + 1) + '.' + game.started.getFullYear();
        let endDate = game.finished.getDate() + '.' + (game.finished.getMonth() + 1) + '.' + game.finished.getFullYear();

        const formData = new FormData();
        formData.append('name', game.name);
        formData.append('image', game.image);
        formData.append('publisher', game.publisher);
        formData.append('genre', game.genre);
        formData.append('platform', game.platform);
        formData.append('started', startDate);
        formData.append('finished', endDate);
        formData.append('rating', game.rating);
        formData.append('notes', game.notes);

        try {
            await axios.post('http://localhost:8080/game/add', formData);
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
            setMessage('Peli lisättiin kirjastoon');
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
            setMessage('Tietojen lisäys ei onnistunut');
        }
        setMessage('Peli lisättiin kirjastoon');
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

    //Kuvan lisääminen
    const changeImage = (e) => {
        setValues({
            ...game,
            image: e.target.files[0]
        });
        setMessage('');
    }

    let imageName = '';
    if (game.image !== null) {
        imageName = game.image.name;
    }

    return (
        <Paper sx={{
            width: { xs: '500px', sm: '500px', md: '700px', lg: '700px' }, padding: '10px',
            marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', marginBottom: '10px'
        }}>
            <Box
                component='form'
                sx={{ '& .MuiTextField-root': { marginBottom: 2 }, padding: 2, margin: 2 }}>
                <Typography variant='h5' sx={{ marginBottom: 2, textAlign: 'center' }}>Lisää peli</Typography>
                <TextField label='Nimi' name='name' value={game.name}
                    onChange={(e) => change(e)} fullWidth required />

                <TextField label='Julkaisija' name='publisher' value={game.publisher}
                    onChange={(e) => change(e)} fullWidth required />

                <TextField label='Genre' name='genre' value={game.genre}
                    onChange={(e) => change(e)} fullWidth required />

                <TextField label='Alusta' name='platform' value={game.platform}
                    onChange={(e) => change(e)} fullWidth required />

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
                    onChange={(e) => change(e)} fullWidth required>
                </TextField>

                <TextField label='Muistiinpanot' name='notes' multiline rows='3'
                    value={game.notes} onChange={(e) => change(e)} fullWidth />

                <Input accept='image/*' name='image' id='image' type='file'
                    onChange={(e) => changeImage(e)} sx={{ display: 'none' }} />

                <InputLabel htmlFor='image'>
                    <Button component='span' startIcon={<AttachmentIcon />}>Kuva</Button>
                    <Typography sx={{ display: 'inline' }}>{imageName}</Typography>
                </InputLabel>

                <Box sx={{ textAlign: 'center', marginTop: 1 }}>
                    <Button color='secondary' onClick={(e) => addGame(e)} variant='contained' startIcon={<AddIcon />}>Lisää kirjastoon</Button>
                </Box>
                <Typography sx={{ marginTop: 3 }}>{message}</Typography>
            </Box>

        </Paper>
    )
}

export default Gameform;