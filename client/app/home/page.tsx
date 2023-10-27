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
import { Feature } from "./Feature";

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


            <Grid item xs={12} md={6}>
              <Feature
                icon={<AddCommentIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />}
                title="Make posts"
                description="Share your problem with others and ask for help"
                reverseOnDesktop={true}
              />

            </Grid>


            <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>


            <Grid item xs={12} md={6}>
              <Feature
                icon={<PsychologyAltIcon sx={{ fontSize: { xs: "3.5rem", md: "4rem" } }} />}
                title="Safe space"
                description="Choose to share your struggles anonymously if you wish not to disclose your identity"
                reverseOnDesktop={false}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <Feature
                icon={<TipsAndUpdatesIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />}
                title="Get solutions"
                description="Get suggestions from peers and help others to solve their problems"
                reverseOnDesktop={true}
              />
            </Grid>


            <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Feature
                icon={<RecommendIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />}
                title="React"
                description="Let other know that you care about disscussed issues"
                reverseOnDesktop={false}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Feature
                icon={<VolunteerActivismIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />}
                title="Volunteer"
                description="Step forward to help your peers implement the solutions"
                reverseOnDesktop={true}
              />
            </Grid>


            <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>
            <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={0} md={6}>
              <Typography></Typography>
            </Grid>


            <Grid item xs={12} md={6}>
              <Feature
                icon={<ForumIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" }, mr: "10px" }} />}
                title="Communicate"
                description="Chat with other volunteers in assigned group chat rooms"
                reverseOnDesktop={false}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <Feature
                icon={<HistoryIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" }, mr: "10px" }} />}
                title="History"
                description="Access your personal archives through your profile"
                reverseOnDesktop={true}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default home;