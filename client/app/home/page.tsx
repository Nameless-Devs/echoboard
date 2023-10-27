import { Box, Typography} from "@mui/material";
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
            mt: "2rem",
            fontSize: { md: "2.5rem" }
          }}
        >Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Typography>xs=6 md=8</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography>xs=6 md=4</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography>xs=6 md=4</Typography>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography>xs=6 md=8</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default home;