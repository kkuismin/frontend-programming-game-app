import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { grey } from '@mui/material/colors';

function Userprofile() {

    const [user, setUser] = useState([]);
    const [error, setError] = useState('');

    //Haku API:sta
    const fetchUrl = async () => {
        try {
            const response = await fetch('https://randomuser.me/api');
            const json = await response.json();
            setUser(json.results);
            setError('');
        } catch (error) {
            setError('Tietoja ei ole saatavilla');
        }
    }

    useEffect(() => { fetchUrl() }, []);

    return (
        <Box sx={{ padding: 2, marginTop: '10px' }}>
            {
                user.map(data => {
                    return (
                        <Card key={data.name} sx={{ margin: 'auto', width: { xs: '500px', sm: '500px', md: '600px', lg: '600px' } }}>
                            <CardHeader
                                sx={{ backgroundColor: grey[300], paddingBottom: 10 }} >
                            </CardHeader>
                            <CardContent sx={{ margin: 2 }}>
                                {data.picture.large ?
                                    <CardMedia sx={{ height: '128px', width: '128px', borderRadius: '50%', marginTop: -12, marginBottom: 2, marginLeft: 'auto', marginRight: 'auto' }}
                                        image={data.picture.large}
                                        title={data.name.first} />
                                    :
                                    <Typography sx={{ height: '128px', width: '128px' }}>Ei kuvaa</Typography>
                                }
                                <Typography variant='h5' sx={{ textAlign: 'center' }} >{data.name.first + " " + data.name.last}</Typography><br />
                                <Typography><b>Käyttäjätunnus:</b> {data.login.username} </Typography>
                                <Typography><b>Salasana:</b> ********</Typography>
                                <Typography><b>Email:</b> {data.email}</Typography>
                                <Typography><b>Ikä:</b> {data.dob.age} vuotta</Typography>
                                <Typography><b>Sijainti:</b> {data.location.city + ", " + data.location.country}</Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
            <Typography>{error}</Typography>
        </Box>

    );
}

export default Userprofile;