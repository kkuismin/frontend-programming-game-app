import React from "react";
import Paper from '@mui/material/Paper'
import Carousel from 'react-bootstrap/Carousel';

function Frontpage() {
    return (
        <Paper sx={{
            width: { xs: '500px', sm: '500px', md: '800px', lg: '800px' }, padding: '20px',
            margin: '10px auto 10px auto'
        }}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/assets/carousel1.jpg"
                        alt="Playstation controller"
                    />
                    <Carousel.Caption>
                        <h3>Tervetuloa!</h3>
                        <p>Tässä sovelluksessa voit tehdä kirjaston, johon lisäät pelaamiasi pelejä.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/assets/carousel2.jpg"
                        alt="Gaming setup"
                    />
                    <Carousel.Caption>
                        <h3>Lisää peli</h3>
                        <p>Lisää pelattujen pelien tiedot ja arvostelu kirjastoon.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/assets/carousel3.jpg"
                        alt="Nintendo Switch"
                    />
                    <Carousel.Caption>
                        <h3>Pelikirjasto</h3>
                        <p>Pelit-välilehdellä voit selata ja hakea kirjastoon lisättyjä pelejä. Pelejä voi myös muokata
                            ja poistaa.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Paper>
    );
}

export default Frontpage;