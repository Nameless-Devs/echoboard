import { Box, Typography } from "@mui/material";
import * as React from "react";
import "../styles/LandingPage.css"
import NavBar from "./NavBar";
import Main from "./Main";
import Grid from '@mui/material/Grid';

const pages = ['Home', 'About', 'Features', 'Contact'];
const home = () => {
  return (
    <>
      <Box className="main__background-picture">
        <NavBar />
        <Main title="EchoBoard" description="Where Your Voice Amplifies Change!" />
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            m: "2rem 0",

            fontSize: { md: "2.5rem" }
          }}
        >Features
        </Typography>
        <Box sx={{
          display: "flex", 
          m: {xs: "10px", md: "auto"}, 
          alignItems: "center",
          maxWidth: {md: "1000px"},
          }}>
          <Grid container spacing={1}>
            <Grid sx={{border: "black 2px solid"}} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid", display: {xs: "none", md: "block"}}} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid", display: {xs: "none", md: "block"}}} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid"}} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid sx={{border: "black 2px solid"}} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid", display: {xs: "none", md: "block"}}} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid", display: {xs: "none", md: "block"}}} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid"}} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid sx={{border: "black 2px solid"}} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid", display: {xs: "none", md: "block"}}} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid", display: {xs: "none", md: "block"}}} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid"}} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid  sx={{border: "black 2px solid"}} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default home;