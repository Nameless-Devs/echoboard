import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import "../styles/LandingPage.css"
import EchoLogoWhite from "../image/EchoBoard_logo_white.png"
import Image from "next/image";


const home = () => {
  return (
    <>
      <Box className="main__background-picture">
        <AppBar sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >
          <Container maxWidth="xl" >
            <Toolbar disableGutters >
            <Image src={EchoLogoWhite} alt="EchoBoard logo white" width={40} />
            <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              opacity: 1,
              marginLeft: "20px"
            }}
          >
            EchoBoard
          </Typography>


            </Toolbar>
          </Container>
        </AppBar>

      </Box>
    </>
  );
};

export default home;