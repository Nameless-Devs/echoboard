import { Box, Typography } from "@mui/material";
import * as React from "react";
import "../styles/LandingPage.css"
import NavBar from "./NavBar";
import Main from "./Main";
import Grid from '@mui/material/Grid';
import AddCommentIcon from '@mui/icons-material/AddComment';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import RecommendIcon from '@mui/icons-material/Recommend';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ForumIcon from '@mui/icons-material/Forum';
import HistoryIcon from '@mui/icons-material/History';

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
                textAlign: { xs: "left", md: "right"},
                display: "flex", 
                padding: "1rem", 
                m: { xs: "0.5rem" , md: "1rem 2rem 1rem 0"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}>
                <AddCommentIcon 
                sx={{ 
                  fontSize: "3rem",
                  mr: "10px",
                  display: {xs: "block", md: "none"}
                   }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    Make posts
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Share your problem with others and ask for help
                    </Typography>
                </Box>
                <AddCommentIcon 
                sx={{ 
                  fontSize: "4rem",
                  ml: "10px",
                  display: {xs: "none", md: "block"},
                   }} />
              </Box>
            </Grid>


            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>


            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
            <Box sx={{ 
                display: "flex", 
                padding: "1rem", 
                m: { xs: "0.5rem" , md: "1rem 0.5rem 1rem 1.5rem"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}>
                 <PsychologyAltIcon sx={{ fontSize: {xs: "3.5rem", md: "4rem"}, mr: "10px" }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    Anonymity
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Choose to share your struggles anonymously if you wish not to disclose your identity
                    </Typography>
                </Box>
              </Box>
            </Grid>


            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
            <Box sx={{ 
                textAlign: { xs: "left", md: "right"},
                display: "flex", 
                padding: "1rem", 
                m: { xs: "0.5rem" , md: "1rem 2rem 1rem 0"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}>
                <TipsAndUpdatesIcon 
                sx={{ 
                  fontSize: "3rem",
                  mr: "10px",
                  display: {xs: "block", md: "none"}
                   }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    Get solutions
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Get suggestions from peers and help other to solve their problems
                    </Typography>
                </Box>
                <TipsAndUpdatesIcon 
                sx={{ 
                  fontSize: "4rem",
                  ml: "10px",
                  display: {xs: "none", md: "block"},
                   }} />
              </Box>
            </Grid>

            
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
          
            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
            <Box sx={{ 
                display: "flex", 
                padding: "1rem", 
                m: { xs: "0.5rem" , md: "1rem 0.5rem 1rem 1.5rem"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}>
                 <RecommendIcon sx={{ fontSize: {xs: "3rem", md: "4rem"}, mr: "10px" }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    React
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Let other know that you care about disscussed issues
                    </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
            <Box sx={{ 
                textAlign: { xs: "left", md: "right"},
                display: "flex", 
                padding: "1rem", 
                m: { xs: "0.5rem" , md: "1rem 2rem 1rem 0"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}>
                <VolunteerActivismIcon 
                sx={{ 
                  fontSize: "3rem",
                  mr: "10px",
                  display: {xs: "block", md: "none"}
                   }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    Volunteer
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Step forward to help your peers implementing the solutions
                    </Typography>
                </Box>
                <VolunteerActivismIcon  
                sx={{ 
                  fontSize: "4rem",
                  ml: "10px",
                  display: {xs: "none", md: "block"},
                   }} />
              </Box>
            </Grid>


            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ border: "black 2px solid", display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>


            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
                <Box sx={{ 
                display: "flex", 
                padding: "1rem", 
                m: { xs: "0.5rem" , md: "1rem 0.5rem 1rem 1.5rem"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}>
                 <ForumIcon sx={{ fontSize: {xs: "3rem", md: "4rem"}, mr: "10px" }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    Communicate 
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Chat with other volunteers in assigned group chat rooms  
                    </Typography>
                </Box>
              </Box>
            </Grid>


            <Grid sx={{ border: "black 2px solid" }} item xs={12} md={6}>
                   <Box sx={{ 
                textAlign: { xs: "left", md: "right"},
                display: "flex", 
                padding: "1rem", 
                m: { xs: "0.5rem" , md: "1rem 2rem 1rem 0"},
                borderRadius: "10px", 
                backgroundColor: "#f9e8dd",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}>
                <HistoryIcon
                sx={{ 
                  fontSize: "3rem",
                  mr: "10px",
                  display: {xs: "block", md: "none"}
                   }} />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: {md: "2rem"}}}>
                    History
                    </Typography>
                  <Typography variant="body1" sx={{ fontSize: {md: "1.2rem"}}}>
                    Access your personal archives thought your profile
                    </Typography>
                </Box>
                <HistoryIcon 
                sx={{ 
                  fontSize: "4rem",
                  ml: "10px",
                  display: {xs: "none", md: "block"},
                   }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default home;