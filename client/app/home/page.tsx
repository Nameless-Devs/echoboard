import { AppBar, Box, Container, Toolbar } from "@mui/material";
import * as React from "react";
import "../styles/LandingPage.css"



const home = () => {
  return (
    <>
    <Box className="main__background-picture"> 
     <AppBar sx={{backgroundColor: "black", opacity: "30%"}}>
     <Container maxWidth="xl">
     <Toolbar disableGutters></Toolbar>

     </Container>
     </AppBar>

    </Box>
    </>
  );
};

export default home;