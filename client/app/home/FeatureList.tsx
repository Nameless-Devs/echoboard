"use client";
import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import { Feature } from "./Feature";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import RecommendIcon from "@mui/icons-material/Recommend";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ForumIcon from "@mui/icons-material/Forum";
import HistoryIcon from "@mui/icons-material/History";

const features = [
  {
    icon: <AddCommentIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />,
    title: "Make posts",
    description: "Share your problem with others and ask for help",
    reverseOnDesktop: true,
  },
  {
    icon: <PsychologyAltIcon sx={{ fontSize: { xs: "3.5rem", md: "4rem" } }} />,
    title: "Safe space",
    description:
      "Choose to share your struggles anonymously if you wish not to disclose your identity",
    reverseOnDesktop: false,
  },
  {
    icon: (
      <TipsAndUpdatesIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />
    ),
    title: "Get solutions",
    description:
      "Get suggestions from peers and help others to solve their problems",
    reverseOnDesktop: true,
  },
  {
    icon: <RecommendIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />,
    title: "React",
    description: "Let others know that you care about discussed issues",
    reverseOnDesktop: false,
  },
  {
    icon: (
      <VolunteerActivismIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />
    ),
    title: "Volunteer",
    description: "Step forward to help your peers implement the solutions",
    reverseOnDesktop: true,
  },
  {
    icon: <ForumIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />,
    title: "Communicate",
    description: "Chat with other volunteers in assigned group chat rooms",
    reverseOnDesktop: false,
  },
  {
    icon: <HistoryIcon sx={{ fontSize: { xs: "3rem", md: "3.5rem" } }} />,
    title: "History",
    description: "Access your personal archives through your profile",
    reverseOnDesktop: true,
  },
];

const emptyGridItem = (
  <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={0} md={6}>
    <Typography></Typography>
  </Grid>
);

export const FeatureList = () => {
  return (
    <>
      <Box id="features" sx={{ marginBottom: { xs: "3rem", md: "5rem" } }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            m: "2rem 0",
            fontSize: { md: "2.5rem" },
          }}
        >
          Features
        </Typography>
        <Box
          sx={{
            display: "flex",
            m: { xs: "10px", md: "auto" },
            alignItems: "center",
            maxWidth: { md: "1100px" },
          }}
        >
          <Grid container spacing={1}>
            {features.map((feature, index) => (
              <>
                <Grid key={index} item xs={12} md={6}>
                  <Feature {...feature} />
                </Grid>
                {emptyGridItem}
                {emptyGridItem}
              </>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
