"use client"
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <Grid id="contact" item xs={12} md={4} style={{ width: "100%" }}>
      <Box sx={{ p: 2, bgcolor: "#c3c3c3" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Button variant="outlined" color="inherit" onClick={() => router.push("/info")}>
             About developers
            </Button> 
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginRight: { xs: "0.5rem", md: "1rem" },
            }}
          >
            <Typography variant="subtitle1">Nameless_devs</Typography>
            <Typography variant="body2">Oslo/Stockholm</Typography>
            <Typography variant="body2">
              <a
                href="mailto:nameless.devs.salt@gmail.com"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MailOutlineIcon style={{ width: "20px" }} />
                nameless.devs.salt@gmail.com
              </a>
            </Typography>
            <Typography variant="body2">
              <a
                href="https://github.com/Nameless-Devs/echoboard"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <GitHubIcon />
                /echoboard
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
