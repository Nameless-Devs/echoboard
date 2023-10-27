import { Box, Typography } from "@mui/material";
import * as React from "react";
import "../styles/LandingPage.css"
import NavBar from "./NavBar";
import Main from "./Main";
import Grid from '@mui/material/Grid';
import AddCommentIcon from '@mui/icons-material/AddComment';

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
          m: { xs: "10px", md: "auto" },
          alignItems: "center",
          maxWidth: { md: "1100px" },
        }}>
          <Grid container spacing={1}>
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
              <Box sx={{ 
                display: "flex", 
                padding: "1rem", 
                // border: "1px solid black",
                m: { xs: "0.5rem" , md: "1rem 2rem 1rem 0"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                // boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                }}>
                <AddCommentIcon sx={{ fontSize: {xs: "3rem", md: "3.5rem"}, mr: "10px" }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    Make posts
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Share your problem with others and ask for help
                    </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
              <Typography>Content</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default home;