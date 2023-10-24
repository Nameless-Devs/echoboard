import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";
import Example from "../image/Example.png";
import Image from "next/image";

interface MainFeaturedProp {
  title: string;
  description: string;
}

export default function MainFeatured({ title, description }: MainFeaturedProp) {
  return (

    <Box
      sx={{
        marginTop: "30px",
        height: 500,
        p: { xs: 4, md: 4 },
        pr: { md: 0 },
        backgroundColor: "#fff",
        color: "black",
        borderRadius: '15px',
        display: "flex", 
        flexWrap: "wrap"
      }}
    >
      <Box>
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
      <Box sx={{alignSelf: "center", margin: "auto"}}>
          <Image
            src={Example}
            alt={"EchoBoard solution screenshot"}
            width={400}
            style={{
              boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
          />
      </Box>
    </Box>
  );
}
