import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationMUI from "./mui/NavigationMUI"
import Frontpage from "./components/Frontpage";
import GetGames from "./components/GetGames"
import Gameform from "./components/Gameform"
import GameformEdit from "./components/GameformEdit"
import Userprofile from "./components/Userprofile"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { grey, pink, purple } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: { main: purple[800], contrastText: '#FFFFFF' },
    secondary: { main: pink[400], contrastText: '#FFFFFF' },
    text: { primary: grey[900], secondary: '#000000', contrastText: '#FFFFFF' },
    background: { default: grey[100] },
  },
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavigationMUI />}>
            <Route index element={<Frontpage />} />
            <Route path='/pelit' element={<GetGames />} />
            <Route path='/lisaa' element={<Gameform />} />
            <Route path='/profiili' element={<Userprofile />} />
            <Route path='/muokkaa/:id/:name/:publisher/:genre/:platform/:started/:finished/:rating/:notes'
              element={<GameformEdit />} />
            <Route path='*' element={<Typography>Väärä reititys</Typography>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
