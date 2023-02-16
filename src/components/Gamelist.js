import React, { useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';
import axios from 'axios';
import GetGames from "./GetGames";

function Gamelist(props) {

    const [gameName, setGameName] = useState('');
    const [searching, setSearching] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    }

    // Pelin poistaminen
    const deleteGame = async (id) => {
        try {
            await axios.get('http://localhost:8080/game/delete/' + id)
            setMessage('Poistettiin');
        } catch (error) {
            setMessage('Poisto kirjastosta ei onnistunut');
        }
        setOpen(true);
    }

    let snackbar =
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>;

    if (message === 'Poistettiin') {
        return (
            <div>
                {snackbar}
                <GetGames />
            </div>
        )
    }

    //Asettaa haettavan pelin
    const change = (e) => {
        setGameName(e.target.value);
        setSearching(false);
    }

    //Asettaa haun todeksi
    const search = () => {
        setSearching(true);
    }

    // Muuttuja haun tulokselle
    let searchedGame = "";

    // Muuttuja pelilistalle
    let gamelist =
        <Grid container spacing={1} justifyContent="center">
            {
                props.games.map(games => {
                    return (
                        // Responsiivinen ulkoasu
                        <Grid item key={games.id} xs={12} sm={6} md={4}>
                            <Card sx={{ margin: 1, padding: 2 }}>
                                <CardHeader title={games.name} sx={{ textAlign: 'center' }} />
                                <CardContent>
                                    {games.image ?
                                        <CardMedia sx={{ height: 200, width: 'auto', marginTop: -2, marginBottom: 2 }}
                                            image={'http://localhost:8080/download/' + games.image}
                                            title={games.name} />
                                        :
                                        <Typography sx={{ height: 100, width: 200 }}>Ei kuvaa</Typography>
                                    }
                                    <Typography><b>Julkaisija:</b> {games.publisher} </Typography>
                                    <Typography><b>Genre:</b> {games.genre} </Typography>
                                    <Typography><b>Alusta:</b> {games.platform} </Typography>
                                    <Typography><b>Aloitusaika:</b> {games.started} </Typography>
                                    <Typography><b>Lopetusaika:</b> {games.finished} </Typography>
                                    <Typography><b>Arvostelu:</b> {games.rating} </Typography>
                                    <Typography><b>Muistiinpanot:</b> {games.notes} </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <IconButton color='secondary' component={Link} to={'/muokkaa/' + games.id + '/' +
                                        games.name + '/' + games.publisher + '/' + games.genre + '/'
                                        + games.platform + '/' + games.started + '/' + games.finished + '/' + games.rating
                                        + '/' + games.notes}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color='secondary' onClick={() => deleteGame(games.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>;

    //Jos hae-painiketta painettiin
    if (searching) {
        //Filtteröidään nimen perusteella
        let result = props.games.filter(game => game.name === gameName);
        //Jos filtteröinti onnistui
        if (result.length > 0) {
            //Mapataan tulos muuttujaan
            searchedGame = result.map(game => {
                return (
                    <Card key={game.id} sx={{ maxWidth: 400, marginTop: 4, margin: 'auto', padding: 2 }}>
                        <CardHeader title={game.name} />
                        <CardContent sx={{ textAlign: 'left' }}>
                            {game.image ?
                                <CardMedia sx={{ height: 200, width: 'auto', marginTop: -2, marginBottom: 2 }}
                                    image={'http://localhost:8080/download/' + game.image}
                                    title={game.name} />
                                :
                                <Typography sx={{ height: 100, width: 200 }}>Ei kuvaa</Typography>
                            }
                            <Typography><b>Julkaisija:</b> {game.publisher} </Typography>
                            <Typography><b>Genre:</b> {game.genre} </Typography>
                            <Typography><b>Alusta:</b> {game.platform} </Typography>
                            <Typography><b>Aloitusaika:</b> {game.started} </Typography>
                            <Typography><b>Lopetusaika:</b> {game.finished} </Typography>
                            <Typography><b>Arvostelu:</b> {game.rating} </Typography>
                            <Typography><b>Muistiinpanot:</b> {game.notes} </Typography>
                        </CardContent>
                    </Card>
                )
            })
            gamelist = "";
        } else {
            searchedGame = <Typography>Hakusanalla ei löydy pelejä</Typography>;
        }
    }

    return (
        <Container sx={{ padding: '10px', marginTop: '10px', marginBottom: '10px' }}>
            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': {
                        width: { xs: '200px', sm: '300px', md: '300px', lg: '300px' },
                        backgroundColor: 'white'
                    }, padding: 1, margin: 1, textAlign: 'center'
                }}>
                <TextField label='Pelin nimi' name='game' value={gameName}
                    onChange={(e) => change(e)} />
                <Box sx={{ display: 'inline', padding: 1 }}>
                    <Button color='secondary' onClick={() => search()} variant='contained' sx={{ marginTop: 1 }}>
                        <SearchIcon />
                    </Button>
                </Box>
                {/* Haun tulos */}
                <Box sx={{ marginTop: 3 }}>{searchedGame}</Box>
            </Box>
            {gamelist}
        </Container>
    );

}

export default Gamelist;