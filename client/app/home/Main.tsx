"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Link, Typography } from "@mui/material";
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
      id="home"
      sx={{
        marginTop: "10px",
        minHeight: 500,
        p: { xs: 4, md: 4 },
        pr: { md: 0 },
        ml: { md: 5 },
        mt: { md: 6 },
        color: "white",
        borderRadius: '15px',
        display: "flex",
        flexWrap: "wrap",

      }}
    >
      <Grid container spacing={1}
        sx={{ marginTop: { md: '2rem' } }}
      >
        <Grid item xs={12} md={6}>
          <Image
            src={Example}
            alt={"EchoBoard solution screenshot"}
            layout="responsive"
            style={{
              boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              borderRadius: "7px",
            }}
          />
          <Link href={ENDPOINTS.LOGIN} style={{ color: "white", textDecoration: "none" }}>
            <Button
              variant="contained"
              size="medium"
              color="warning"
              sx={{ display: { xs: "block", md: "none" } }}
              style={{
                width: "200px",
                maxWidth: "200px",
                alignSelf: "center",
                margin: "40px auto 0",

              }}>
              Log in
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: { xs: "auto", md: "auto" },
            textAlign: "center"
          }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'popins',
                letterSpacing: '.1rem',
                fontWeight: 800,
                fontSize: { xs: "3.5rem", md: "5rem" }
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'popins',
                fontWeight: 500,
                fontSize: { xs: "2rem", md: "2.5rem" },
                marginTop: "10px",
              }}
            >
              {description}
            </Typography>
            <Button
              onClick={() => window.location.href = ENDPOINTS.LOGIN}
              variant="contained"
              size="medium"
              color="warning"
              sx={{ display: { xs: "none", md: "block" } }}
              style={{
                width: "200px",
                maxWidth: "200px",
                alignSelf: "center",
                marginTop: "2rem",
              }}>
              Log in
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
