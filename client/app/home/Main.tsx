import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface MainFeaturedProp {
  title: string;
  description: string;
}

export default function MainFeatured({ title, description }: MainFeaturedProp) {
  return (
    <Box
      sx={{
        marginTop: "30px",
        height: 400,
        p: { xs: 4, md: 4 },
        pr: { md: 0 },
        backgroundColor: "#E5E4E2",
        color: "black",
        borderRadius: '15px'
      }}
    >
      <Typography
        variant="h2"
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
      >
        {description}
      </Typography>
    </Box>
  );
}
