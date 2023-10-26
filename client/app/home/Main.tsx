import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Link, Typography } from "@mui/material";
import Example from "../image/Example.png";
import Image from "next/image";
import { ENDPOINTS } from "@/service/config";

interface MainFeaturedProp {
  title: string;
  description: string;
}

export default function MainFeatured({ title, description }: MainFeaturedProp) {
  return (
    <Box
      sx={{
        marginTop: "10px",
        minHeight: 500,
        p: { xs: 4, md: 4 },
        pr: { md: 0 },
        color: "white",
        borderRadius: '15px',
        display: "flex",
        flexWrap: "wrap",

      }}
    >
      <Box sx={{marginTop: { xs:"", md: "55px"}}}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Image
            src={Example}
            alt={"EchoBoard solution screenshot"}
            layout="responsive"
            width= { 450 }
            style={{
              boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              borderRadius: "7px",
            }}
          />
          <Button
            variant="contained"
            size="medium"
            color="warning"
            sx={{ display: { xs: "block", md: "none"}} } 
            style={{
              width: "200px",
              maxWidth: "200px",
              alignSelf: "center",
              marginTop: "40px",
             
            }}>
            <Link href={ENDPOINTS.LOGIN} style={{ color: "white", textDecoration: "none"  }}>
              Log in
            </Link>
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "center", 
        margin: { xs: "auto", md: "auto"},
        textAlign: "center"
        }}
        >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'popins',
            letterSpacing: '.1rem',
            fontWeight: 800,
            fontSize: { xs: "3.5rem", md: "5rem"}
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'popins',
            fontWeight: 500,
            fontSize: { xs: "2rem", md: "2.5rem"},
            marginTop: "10px",
          }}
        >
          {description}
        </Typography>
        <Button
            variant="contained"
            size="medium"
            color="warning"
            sx={{ display: { xs: "none", md: "block"}} } 
            style={{
              width: "200px",
              maxWidth: "200px",
              alignSelf: "center",
              marginTop: "40px",
            }}>
            <Link href={ENDPOINTS.LOGIN} style={{ color: "white", textDecoration: "none"  }}>
              Log in
            </Link>
          </Button>
        {/* <Box sx={{maxWidth: "600px", marginTop: "50px", marginBottom: "30px"}}>
        <Typography variant="h6">
        EchoBoard is a platform designed to address the challenge of effectively sharing and solving problems within the workplace. 
        It aims to bridge the gap between employees and upper management by providing a platform for employees to voice their concerns, 
        propose solutions, and collaborate on addressing issues that impact the organisation.
        </Typography>
        </Box> */}
      </Box>
    </Box>
  );
}
