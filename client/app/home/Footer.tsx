import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';


export default function Footer() {


  return (
    <Grid 
      id="contact"
      item
      xs={12}
      md={4}
      style={{ width: "100%" }}
    >
      <Box sx={{ p: 2, bgcolor: "#c3c3c3" }}>
        <Box sx={{
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center"
      }}>
          <Box>
            <Typography>
            &copy; 2023
            </Typography>
          </Box>
          <Box sx={{
            display: "flex", 
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: {xs: '0.5rem', md: "1rem"},
            }}>
            <Typography variant="subtitle1">
              Nameless_devs
            </Typography>
            <Typography variant="body2">Oslo/Stockholm</Typography>
            <Typography variant="body2">
              <a href="mailto:nameless.devs.salt@gmail.com"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <MailOutlineIcon style={{ width: "20px" }} />
                nameless.devs.salt@gmail.com
              </a>
            </Typography>
            <Typography variant="body2">
              <a href="https://github.com/Nameless-Devs/echoboard"
                target="_blank"
                style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center"
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
