import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Gamelist from './Gamelist';

import axios from 'axios';

function GetGames() {

  const [games, setGames] = useState([]);
  const [error, setError] = useState('Haetaan');

  const getAllGames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/game/all');
      setGames(response.data);
      setError('');
    } catch (error) {
      setGames([]);
      setError('Tietojen haku ei onnistunut');
    }
  }

  // Haku tietokannasta
  useEffect(() => {
    getAllGames();
  }, [])

  if (error.length > 0) {
    return (<Typography>{error}</Typography>);
  }

  if (games.length > 0) {
    return (<Gamelist games={games} />);
  }

  return (<Typography>Kirjastossa ei ole yhtään peliä</Typography>);
}

export default GetGames;
