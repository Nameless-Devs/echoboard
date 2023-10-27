import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ForumIcon from "@mui/icons-material/Forum";
import HistoryIcon from "@mui/icons-material/History";

type FeatureProps = {
    icon: React.ReactElement;
    title: string;
    description: string;
    reverseOnDesktop?: boolean;
}

export const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  reverseOnDesktop,
}) => {

  const isReverseOnDesktop = reverseOnDesktop !== undefined ? reverseOnDesktop : false;
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            textAlign: { xs: "left", md: "right" },
            display: "flex",
            padding: "1rem",
            m: { xs: "0.5rem", md: reverseOnDesktop ? "0 0 0 1.5rem" : "0 1.5rem 0 0" },
            borderRadius: "10px",
            backgroundColor: "#f9e8dd",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          {reverseOnDesktop && (
            <>
             <Box sx={{ display: {xs: "flex", md: "none"} }}>
              {icon}
              <Box ml={"10px"}>
                <Typography variant="h5" sx={{ fontSize: { md: "2rem" } }}>
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { md: "1.2rem" } }}>
                  {description}
                </Typography>
              </Box>
              </Box>

              <Box sx={{ display: {xs: "none", md: "flex"} }}>
              <Box mr={"10px"}>
                <Typography variant="h5" sx={{ fontSize: { md: "2rem" } }}>
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { md: "1.2rem" } }}>
                  {description}
                </Typography>
              </Box>
             {icon}
              </Box>

            </>
    
          )}
          {!reverseOnDesktop && (
            <>
              <Box>
                <Typography variant="h5" sx={{ fontSize: { md: "2rem" } }}>
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { md: "1.2rem" } }}>
                  {description}
                </Typography>
              </Box>
              {icon}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

