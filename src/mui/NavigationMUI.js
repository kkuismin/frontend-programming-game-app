import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Link, Outlet } from 'react-router-dom';

function NavigationMUI() {

  const [anchorNavigation, setOpenNavigation] = useState(null);
  const [anchorProfile, setOpenProfile] = useState(null);

  const menuOpen = (e) => {
    setOpenNavigation(e.currentTarget);
  };

  const profileOpen = (e) => {
    setOpenProfile(e.currentTarget);
  };

  const menuClose = () => {
    setOpenProfile(null);
    setOpenNavigation(null);
  }

  const menu =
    <Menu
      anchorEl={anchorNavigation}
      open={Boolean(anchorNavigation)}
      onClose={menuClose}
    >
      <MenuItem onClick={menuClose} component={Link} to='/'>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary='Etusivu' />
      </MenuItem>
      <MenuItem onClick={menuClose} component={Link} to='pelit'>
        <ListItemIcon><SportsEsportsIcon /></ListItemIcon>
        <ListItemText primary='Pelit' />
      </MenuItem>
      <MenuItem onClick={menuClose} component={Link} to='lisaa'>
        <ListItemIcon><AddIcon /></ListItemIcon>
        <ListItemText primary='Lisää peli' />
      </MenuItem>
    </Menu>;

  const profile =
    <Menu
      anchorEl={anchorProfile}
      open={Boolean(anchorProfile)}
      onClose={menuClose}
    >
      <MenuItem onClick={menuClose} component={Link} to='profiili'>
        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
        <ListItemText primary='Profiili' />
      </MenuItem>
    </Menu>;

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={menuOpen} color='inherit'>
            <MenuIcon />
          </IconButton>
          {menu}

          <Typography variant='h5' sx={{ flexGrow: 1, textAlign: 'center' }}>Pelikirjasto</Typography>

          <IconButton onClick={profileOpen} color='inherit'>
            <AccountCircleIcon />
          </IconButton>
          {profile}

        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );

}

export default NavigationMUI;